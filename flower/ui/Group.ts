module flower {
    export class Group extends flower.Sprite {

        public constructor() {
            super();
            flower.Component.init(this);
        }

        private _layout:flower.Layout;
        public get layout():flower.Layout {
            return this._layout;
        }

        public set layout(val:flower.Layout) {
            if (this._layout) {
                this._layout.$clear();
            }
            this._layout = val;
            if (this._layout) {
                this._layout.$setFlag();
                var len:number = this.numChildren;
                for (var i:number = 0; i < len; i++) {
                    this._layout.addElementAt(this.getChildAt(i), i);
                }
            }
        }

        public $onFrameEnd() {
            this._resetUIProperty();
            super.$onFrameEnd();
            if (this.layout && this.$getFlag(4) && !(this.parent instanceof flower.Group)) {
                this.layout.$setFlag();
            }
            if (this.layout) {
                this.layout.updateList(this.width, this.height);
                this.$removeFlag(4);
            }
        }

        public dispose() {
            this.layout = null;
            for (var key in this._binds) {
                this._binds[key].dispose();
            }
            this._binds = null;
            super.dispose();
        }

        //////////////////////////////////interface//////////////////////////////////
        private _binds;
        public eventThis;
        public onAdded;
        public absoluteState;
        public state;
        public currentState;
        public topAlgin;
        public bottomAlgin;
        public leftAlgin;
        public rightAlgin;
        public horizontalCenterAlgin;
        public verticalCenterAlgin;
        public top;
        public bottom;
        public left;
        public right;
        public horizontalCenter;
        public verticalCenter;
        public percentWidth;
        public percentHeight;
        public bindProperty(property:string, content:string, checks:Array<any> = null) {
        }

        public removeBindProperty(property:string) {
        }

        public setStatePropertyValue(property:string, state:string, val:string, checks:Array<any> = null) {

        }

        public changeState(state:string):string {
            return "";
        }
        private _resetUIProperty():void {

        }
        //////container//////
        protected addUIEvents() {
        }

        public addChild(child:flower.DisplayObject) {
            super.addChild(child);
            if (child.nativeClass == "UI") {
                if (!child["absoluteState"]) {
                    child["currentState"] = this.currentState;
                }
            }
            if (this.layout) {
                this.layout.addElementAt(child, this.numChildren - 1);
            }
        }

        public addChildAt(child:flower.DisplayObject, index:number = 0) {
            super.addChildAt(child, index);
            if (child.nativeClass == "UI") {
                if (!child["absoluteState"]) {
                    child["currentState"] = this.currentState;
                }
            }
            if (this.layout) {
                this.layout.addElementAt(child, index);
            }
        }

        public removeChild(child:flower.DisplayObject) {
            super.removeChild(child);
            if (this.layout) {
                this.layout.removeElement(child);
            }
        }

        public removeChildAt(index:number) {
            super.removeChildAt(index);
            if (this.layout) {
                this.layout.removeElementAt(index);
            }
        }

        public setChildIndex(child:flower.DisplayObject, index:number) {
            super.setChildIndex(child, index);
            if (this.layout) {
                this.layout.setEelementIndex(child, index);
            }
        }
    }
    flower.Component.register(Group,true);
}

