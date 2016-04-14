module flower {

    export class Mask extends flower.DisplayObject implements flower.DisplayObjectContainer {

        private _shape:flower.Shape;

        public constructor() {
            super();
            this._shape = new flower.Shape();
            this._show = System.getNativeShow("Mask");
            this._nativeClass = "Mask";
            flower.Container.init(this);
            System.Mask.init(this._show,this._shape._show);
        }

        public get shape():flower.Shape {
            return this._shape;
        }

        public dispose():void {
            var show:any = this._show;
            var childs = this["_childs"];
            while (childs.length) {
                childs[0].dispose();
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
            System.cycleNativeShow("Mask", show);
        }

        //////////////////////////////////interface//////////////////////////////////
        public _getMouseTarget(matrix:flower.Matrix, mutiply:boolean):flower.DisplayObject {
            return null;
        }

        public addChild(child:flower.DisplayObject) {

        }

        public getChildAt(index:number):flower.DisplayObject {
            return null;
        }

        public addChildAt(child:flower.DisplayObject, index?:number) {

        }

        public removeChild(child:flower.DisplayObject) {

        }

        public removeChildAt(index:number) {

        }

        public setChildIndex(child:flower.DisplayObject, index:number) {

        }

        public getChildIndex(child:flower.DisplayObject):number {
            return -1;
        }

        public contains(child:flower.DisplayObject):boolean {
            return false;
        }

        public mesureWidth:number;
        public mesureHeight:number;
        public numChildren:number;

        public $getFlag(pos:number):boolean {
            return false;
        }
    }

    flower.Container.register(Mask);
}