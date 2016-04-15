module flower {
    export class Scroller extends MaskUI {
        private _viewport:IViewPort;

        public constructor() {
            super();
            flower.Component.init(this);
            var rect = new RectUI();
            rect.percentWidth = 100;
            rect.percentHeight = 100;
            this.shape = rect;
        }

        public $onFrameEnd() {
            if(this.viewport instanceof DataGroup) {
                (<DataGroup>this.viewport).$flushItems();
            }
            super.$onFrameEnd();
        }

        public dispose() {
            super.dispose();
        }
        //////////////////////////////////get&set//////////////////////////////////
        public set viewport(val:IViewPort) {
            if (this._viewport == val) {
                return;
            }
            this._viewport = val;
            if (this._viewport.parent != this) {
                this.addChild(this._viewport);
            }
        }

        public get viewport():IViewPort {
            return this._viewport;
        }
    }
}