module flower {
    export class Bitmap extends flower.DisplayObject {
        public static bitmapProperty:any = System.Bitmap;

        private _texture:flower.Texture2D;

        public constructor(texture:flower.Texture2D = null) {
            super();
            this._show = System.getNativeShow("Bitmap");
            this.texture = texture;
            this._nativeClass = "Bitmap";
        }

        public _setTexture(val:flower.Texture2D) {
            if (this._texture) {
                this._texture.$delCount();
            }
            this._texture = val;
            var p:any = flower.Bitmap.bitmapProperty.texture;
            if (val) {
                this._width = this._texture.width;
                this._height = this._texture.height;
                this._texture.$addCount();
                p.exe(this._show, this._texture.$nativeTexture, this._texture.source, this._texture.sourceRotation);
                if (System.IDE == IDE.COCOS2DX) {
                    this._show.setAnchorPoint(0, 1);
                }
                this._setX(this.x);
                this._setY(this.y);
            }
            else {
                this._width = 0;
                this._height = 0;
                p.exe(this._show, flower.Texture2D.blank.$nativeTexture);
            }
            this.$propagateFlagsUp(10);
        }

        public _getMouseTarget(matrix:flower.Matrix, mutiply:boolean):flower.DisplayObject {
            matrix.save();
            if (this._texture) {
                matrix.translate(-this._texture.offX, -this._texture.offY);
            }
            var target = super._getMouseTarget(matrix, mutiply);
            matrix.restore();
            return target;
        }

        public _setX(val:number, offX:number = 0) {
            super._setX(val, this._texture ? this._texture.offX : 0);
        }

        public _setY(val:number, offY:number = 0) {
            super._setY(val, this._texture ? this._texture.offY : 0);
        }

        public _setWidth(val:number) {
            this.scaleX = val / this._width;
        }

        public _setHeight(val:number) {
            this.scaleY = val / this._height;
        }

        public set texture(val:flower.Texture2D) {
            if (val == this._texture) {
                return;
            }
            this._setTexture(val);
        }

        public get texture():flower.Texture2D {
            return this._texture;
        }

        public dispose() {
            var show:any = this._show;
            super.dispose();
            this.texture = null;
            System.cycleNativeShow("Bitmap", show);
        }
    }
}

