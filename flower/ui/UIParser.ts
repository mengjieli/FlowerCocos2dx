module flower {
    export class UIParser {
        private classes:any;
        private parseContent:string;
        private id:number = 0;

        public constructor() {
            this.classes = {};
            this.classes.f = {
                "Label": "flower.Label",
                "Image": "flower.Image",
                "Group": "flower.Group",
                "Button": "flower.Button",
                "LinearLayoutBase": "flower.LinearLayoutBase",
                "HorizontalLayout": "flower.HorizontalLayout",
                "VerticalLayout": "flower.VerticalLayout"
            };
            this.classes.local = {};
            this.classes.localContent = {};
        }

        public getLocalUIClass(name:string):any {
            return this.classes.local[name];
        }

        public addLocalUIClass(name:string, cls:any) {
            this.classes.local[name] = cls;
        }

        public setLocalUIClassContent(name:string, content:string) {
            this.classes.localContent[name] = content;
        }

        public parseUI(content:any, data:any):any {
            var className = this.parse(content);
            var UIClass = this.classes.local[className];
            if (data) {
                return new UIClass(data);
            }
            return new UIClass();
        }

        public parse(content:any):string {
            //trace("解析UI:", content);
            this.parseContent = content;
            var xml:flower.XMLElement;
            if (typeof(content) == "string") {
                xml = flower.XMLElement.parse(content);
            }
            else {
                xml = content;
            }
            if (xml.getNameSapce("f") == null || xml.getNameSapce("f").value != "flower.ui") {
                if (flower.Engine.DEBUG) {
                    flower.DebugInfo.debug("解析 UI 出错,未设置命名空间 xmlns:f=\"flower.ui\" :" + "\n" + content, flower.DebugInfo.ERROR);
                }
                return null;
            }
            var className = this.decodeRootComponent(xml, content);
            this.parseContent = "";
            return className;
        }

        private decodeRootComponent(xml:flower.XMLElement, classContent:string):string {
            var content = "";
            var hasLocalNS:boolean = xml.getNameSapce("local") ? true : false;
            var uiname:string = xml.name;
            var uinameNS:string = uiname.split(":")[0];
            var extendClass = "";
            uiname = uiname.split(":")[1];
            var className = "";
            var allClassName = "";
            var packages = [];
            if (uinameNS == "local") {
                extendClass = uiname;
            } else {
                extendClass = this.classes[uinameNS][uiname];
            }
            var classAtr:flower.XMLAttribute = xml.getAttribute("class");
            if (classAtr) {
                className = classAtr.value;
                allClassName = className
                packages = className.split(".");
                if (packages.length > 1) {
                    className = packages[packages.length - 1];
                    packages.pop();
                } else {
                    packages = [];
                }
            } else {
                className = "$UI" + this.id++;
                allClassName = className;
            }
            var changeAllClassName = allClassName;
            if (this.classes.local[allClassName]) {
                if (this.classes.localContent[allClassName] == classContent) {
                    return allClassName;
                } else {
                    changeAllClassName = changeAllClassName.slice(0, changeAllClassName.length - className.length);
                    className = "$UI" + this.id++;
                    changeAllClassName += className;
                }
            }
            var before = "";
            for (var i = 0; i < packages.length; i++) {
                content += before + "var " + packages[i] + ";\n";
                content += before + "(function (" + packages[i] + ") {\n";
                before += "\t";
            }
            content += before + "var " + className + " = (function (_super) {\n";
            content += before + "\t__extends(" + className + ", _super);\n";
            content += before + "\tfunction " + className + "(data) {\n";
            content += before + "\t\tif(data) this.data = data;\n";
            content += before + "\t\t _super.call(this);\n";
            var scriptInfo = {
                content: ""
            };
            content += this.decodeScripts(before, className, xml.getElements("f:script"), scriptInfo);
            content += before + "\t\tthis.$initMain(this);\n";
            var propertyList = [];
            this.decodeObject(before + "\t", className, "$initMain", false, xml, hasLocalNS, propertyList, {});
            content += before + "\t}\n\n";
            content += propertyList[propertyList.length - 1];
            for (var i = 0; i < propertyList.length - 1; i++) {
                content += propertyList[i];
            }
            content += scriptInfo.content;
            content += before + "\treturn " + className + ";\n";
            content += before + "})(" + extendClass + ");\n";
            before = "";
            var classEnd = "";
            for (var i = 0; i < packages.length; i++) {
                if (i == 0) {
                    classEnd = before + "})(" + packages[i] + " || (" + packages[i] + " = {}));\n" + classEnd;

                } else {
                    classEnd = before + "})(" + packages[i] + " = " + packages[i - 1] + "." + packages[i] + " || (" + packages[i - 1] + "." + packages[i] + " = {}));\n" + classEnd;
                }
                before += "\t";
                if (i == packages.length - 1) {
                    classEnd = before + packages[i] + "." + className + " = " + className + ";\n" + classEnd;
                }
            }
            content += classEnd;
            content += "\n\nUIParser.registerUIClass(\"" + allClassName + "\", " + changeAllClassName + ");\n";
            //trace("解析后内容:\n", content);
            if (Engine.DEBUG) {
                try {
                    eval(content);
                } catch (e) {
                    flower.DebugInfo.debug("解析 UI 出错,:\n" + e + "\n" + this.parseContent, flower.DebugInfo.ERROR);
                }
            } else {
                eval(content);
            }
            this.setLocalUIClassContent(allClassName, classContent);
            trace("解析类:\n", content);
            return allClassName;
        }

        private decodeScripts(before:string, className:string, scripts:Array<flower.XMLElement>, script):string {
            var content = "";
            for (var i = 0; i < scripts.length; i++) {
                for (var s = 0; s < scripts[i].list.length; s++) {
                    var item = scripts[i].list[s];
                    var childName:string = item.name;
                    childName = childName.split(":")[1];
                    if (item.value == null || item.value == "") {
                        var initValue = item.getAttribute("init");
                        content += before + "\t\tthis." + childName + " = " + (initValue == null ? "null" : initValue.value) + ";\n";
                    } else {
                        script.content += before + "\t" + className + ".prototype." + childName + " = function(";
                        var params = item.getAttribute("params");
                        if (params) {
                            script.content += params.value;
                        }
                        script.content += ") {\n";
                        script.content += "\t\t" + item.value;
                        script.content += "\t}\n\n";
                    }
                }
            }
            return content;
        }

        private decodeObject(before:string, className:string, funcName:string, createClass:boolean, xml:flower.XMLElement, hasLocalNS:boolean, propertyFunc:Array<string>, nameIndex:any):void {
            var setObject = before + className + ".prototype." + funcName + " = function(parentObject) {\n";
            var thisObj = "parentObject";
            if (createClass) {
                var createClassNameSpace = xml.name.split(":")[0];
                var createClassName = xml.name.split(":")[1];
                if (createClassNameSpace != "local") {
                    createClassName = this.classes[createClassNameSpace][createClassName];
                }
                thisObj = createClassName.split(".")[createClassName.split(".").length - 1];
                thisObj = thisObj.toLocaleLowerCase();
                if (createClassNameSpace == "local") {
                    setObject += before + "\tvar " + thisObj + " = new (flower.UIParser.getLocalUIClass(\"" + createClassName + "\"))();\n";
                } else {
                    setObject += before + "\tvar " + thisObj + " = new " + createClassName + "();\n";
                }
                setObject += before + "\t" + thisObj + ".eventThis = this;\n";
            }
            for (var i:number = 0; i < xml.attributes.length; i++) {
                var atrName:string = xml.attributes[i].name;
                var atrValue:string = xml.attributes[i].value;
                var atrArray:Array<any> = atrName.split(".");
                if (atrName == "class") {
                } else if (atrName == "id") {
                }
                else if (atrArray.length == 2) {
                    var atrState:string = atrArray[1];
                    atrName = atrArray[0];
                    setObject += before + "\t" + thisObj + ".setStatePropertyValue(\"" + atrName + "\", \"" + atrState + "\", \"" + atrValue + "\", [this]);\n";
                }
                else if (atrArray.length == 1) {
                    if (atrValue.indexOf("{") >= 0 && atrValue.indexOf("}") >= 0) {
                        setObject += before + "\t" + thisObj + ".bindProperty(\"" + atrName + "\", \"" + atrValue + "\", [this]);\n";
                    } else {
                        setObject += before + "\t" + thisObj + "." + atrName + " = " + (this.isNumberOrBoolean(atrValue) ? atrValue : "\"" + atrValue + "\"") + ";\n";
                    }
                }
            }
            if (xml.list.length) {
                var itemClassName;
                for (i = 0; i < xml.list.length; i++) {
                    var item:flower.XMLElement = xml.list[i];
                    var childName:string = item.name;
                    var childNameNS:string = childName.split(":")[0];
                    childName = childName.split(":")[1];
                    var childClass = null;
                    if (childNameNS == "f" && childName == "script") {
                        continue;
                    } else if (item.value != null && item.value != "") { //属性
                        setObject += before + "\t" + thisObj + "." + childName + " = \"" + flower.StringDo.changeStringToInner(item.value) + "\";\n";
                        continue;
                    } else if (childNameNS == "local") {
                        if (!hasLocalNS) {
                            if (flower.Engine.DEBUG) {
                                flower.DebugInfo.debug("解析 UI 出错:无法解析的命名空间 " + childNameNS + " :\n" + this.parseContent, flower.DebugInfo.ERROR);
                            }
                        }
                        if (this.classes.local[childName]) {
                            childClass = childName;
                        } else {
                            if (flower.Engine.DEBUG) {
                                flower.DebugInfo.debug("解析 UI 出错:无法解析的类名 " + childName + " :\n" + this.parseContent, flower.DebugInfo.ERROR);
                            }
                        }
                    } else {
                        if (this.classes[childNameNS]) {
                            childClass = this.classes[childNameNS][childName];
                        } else {
                            if (flower.Engine.DEBUG) {
                                flower.DebugInfo.debug("解析 UI 出错:无法解析的命名空间 " + childNameNS + " :\n" + this.parseContent, flower.DebugInfo.ERROR);
                            }
                        }
                    }
                    if (childClass == null) {
                        item = item.list[0];
                    }
                    itemClassName = item.name.split(":")[1];
                    if (!nameIndex[itemClassName]) {
                        nameIndex[itemClassName] = 1;
                    } else {
                        nameIndex[itemClassName]++;
                        itemClassName += nameIndex[itemClassName];
                    }
                    if (childClass == null) {
                        funcName = "$get" + itemClassName;
                        setObject += before + "\t" + thisObj + "." + childName + " = this." + funcName + "(" + thisObj + ");\n";
                        this.decodeObject(before, className, funcName, true, item, hasLocalNS, propertyFunc, nameIndex);
                    } else {
                        var idAtr:XMLAttribute = item.getAttribute("id");
                        funcName = "$get" + itemClassName;
                        if (idAtr) {
                            setObject += before + "\t" + "this" + "." + idAtr.value + " = this." + funcName + "(" + thisObj + ");\n";
                            setObject += before + "\t" + thisObj + ".addChild(" + "this" + "." + idAtr.value + ");\n";
                        } else {
                            setObject += before + "\t" + thisObj + ".addChild(this." + funcName + "(" + thisObj + "));\n";
                        }
                        this.decodeObject(before, className, funcName, true, item, hasLocalNS, propertyFunc, nameIndex);
                    }
                }
            }
            if (createClass) {
                setObject += before + "\treturn " + thisObj + ";\n";
            }
            setObject += before + "}\n\n";
            propertyFunc.push(setObject);
        }

        private isNumberOrBoolean(str:string):boolean {
            if (str == "true" || str == "false") {
                return true;
            }
            if (str.length > 3 && ( str.slice(0, 2) == "0x" || str.slice(0, 2) == "0X")) {
                for (var i = 2; i < str.length; i++) {
                    var code = str.charCodeAt(i);
                    if (code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102) {
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                for (var i = 0; i < str.length; i++) {
                    var code = str.charCodeAt(i);
                    if (code >= 48 && code <= 57) {
                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        }

        public static ist:flower.UIParser;

        public static parse(content:any):string {
            if (!flower.UIParser.ist) {
                flower.UIParser.ist = new flower.UIParser();
            }
            return flower.UIParser.ist.parse(content);
        }

        public static parseUI(content:any, data:any = null):any {
            if (!flower.UIParser.ist) {
                flower.UIParser.ist = new flower.UIParser();
            }
            return flower.UIParser.ist.parseUI(content, data);
        }

        public static getLocalUIClass(name:string):any {
            if (!flower.UIParser.ist) {
                flower.UIParser.ist = new flower.UIParser();
            }
            return flower.UIParser.ist.getLocalUIClass(name);
        }

        public static registerUIClass(name:string, cls:any) {
            if (!flower.UIParser.ist) {
                flower.UIParser.ist = new flower.UIParser();
            }
            flower.UIParser.ist.addLocalUIClass(name, cls);
        }
    }
}

