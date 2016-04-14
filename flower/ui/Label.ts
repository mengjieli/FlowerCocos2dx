module flower {
    export class Label extends flower.TextField {

        public constructor() {
            super();
            flower.Component.init(this);
        }

        public _setNativeText() {
            super._setNativeText();
            this.$addFlag(10);
        }

        public $onFrameEnd() {
            super.$onFrameEnd.call(this);
            this._resetUIProperty();
        }

        public dispose() {
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
    }
    flower.Component.register(Label);
}

