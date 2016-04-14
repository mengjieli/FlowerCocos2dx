module flower {
    export class Sprite extends flower.DisplayObject implements flower.DisplayObjectContainer {

        public constructor() {
            super();
            this._show = System.getNativeShow("DisplayObjectContainer");
            this._nativeClass = "DisplayObjectContainer";
            flower.Container.init(this);
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
            System.cycleNativeShow("DisplayObjectContainer", show);
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

    flower.Container.register(Sprite);
}

