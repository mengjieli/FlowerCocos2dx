module test {
    export class TestLayout extends flower.Group {

        public constructor() {
            super();
            var loadList:flower.URLLoaderList = new flower.URLLoaderList(["res/uxml/Layout.xml"]);
            loadList.addListener(flower.Event.COMPLETE, this.onLoadComplete, this);
            loadList.load();
        }

        private onLoadComplete(e:flower.Event) {
            flower.Binding.addBindingCheck(flower.DataManager.ist);
            flower.Binding.addBindingCheck(flower.Formula);
            flower.DataManager.ist.addDataDeinf({
                "name": "MainData",
                "desc": "派克总数据",
                "members": {
                    "x": {"desc": "坐标 x", "type": "int", "init": 10},
                    "y": {"desc": "坐标 y", "type": "int", "init": 20},
                    "title": {"type": "string", "init": "标题啊"},
                    "title2": {"type": "string", "init": "副标题"}
                }
            });
            flower.DataManager.ist.addRootData("main", "MainData");
            flower.Formula["and"] = function (a:any, b:any):boolean {
                a = +a || 0;
                b = +b || 0;
                return a && b ? true : false;
            }
            flower.Formula["mutily"] = function (a:any, b:any):number {
                return a * b;
            }

            var panel:flower.Group = flower.UIParser.parseUI(e.data[0]);
            this.addChild(panel);
            panel.currentState = "select";
            panel.addListener(flower.TouchEvent.TOUCH_END, function (e:flower.TouchEvent) {
                panel.currentState = panel.currentState == "select" ? "noselect" : "select";
                flower.DataManager.ist.main.x.value += flower.DataManager.ist.main.x.value;
            }, this);
            trace("txt=",panel.txt1.text);


            var panel2:flower.Group = flower.UIParser.parseUI(e.data[0]);
            panel2.x = 400;
            panel2.y = 400;
            panel2.currentState = "select";
            this.addChild(panel2);
            panel2.addListener(flower.TouchEvent.TOUCH_END, function (e:flower.TouchEvent) {
                panel2.currentState = panel2.currentState == "select" ? "noselect" : "select";
                flower.DataManager.ist.main.x.value += flower.DataManager.ist.main.x.value;
            }, this);
            trace("txt=",panel2.txt1.text);

            //var panel2:flower.Group = flower.UIParser.parseUI(e.data[0]);
            //panel2.currentState = "select";
            //panel2.x = 400;
            //panel2.y = 400;
            //this.addChild(panel2);
            //panel2.addListener(flower.TouchEvent.TOUCH_END, function (e:flower.TouchEvent) {
            //    panel2.currentState = panel2.currentState == "select" ? "noselect" : "select";
            //    flower.DataManager.ist.main.x.value += flower.DataManager.ist.main.x.value;
            //}, this);
            //trace(panel2.txt1.text);
        }

    }
}

