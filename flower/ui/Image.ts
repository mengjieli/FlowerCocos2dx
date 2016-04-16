module flower {
    export class Image extends flower.Bitmap implements flower.UIComponent {
        private _loader:flower.URLLoader;
        private _source:any;

        public constructor(source:any = null) {
            super();
            flower.Component.init(this);
            if (source) {
                this.setSource(source);
            }
        }

        private setSource(val:any) {
            if (this._loader) {
                this._loader.dispose();
                this._loader = null;
            }
            if (val instanceof flower.Texture2D) {
                this.texture = val;
            }
            else {
                this._loader = new flower.URLLoader(val);
                this._loader.load();
                this._loader.addListener(flower.Event.COMPLETE, this.onLoadTextureComplete, this);
            }
        }

        public _setTexture(val:flower.Texture2D) {
            super._setTexture(val);
            this.$addFlag(0x200);
        }

        public set src(val:any) {
            if (this._source == val) {
                return;
            }
            this._source = val;
            this.setSource(val);
        }

        public get src():any {
            return this._source;
        }

        private onLoadTextureComplete(e:flower.Event) {
            this.texture = e.data;
        }

        public $onFrameEnd() {
            super.$onFrameEnd.call(this);
            this.resetUIProperty();
        }

        public dispose() {
            if (this._loader) {
                this._loader.dispose();
                this._loader = null;
            }
            for (var key in this._binds) {
                this._binds[key].dispose();
            }
            this._binds = null;
            super.dispose.call(this);
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

        protected resetUIProperty():void {

        }
    }
    flower.Component.register(Image);
}

