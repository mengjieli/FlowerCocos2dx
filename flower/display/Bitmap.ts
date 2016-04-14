module flower {
    export class Bitmap extends flower.DisplayObject {
        private _texture:flower.Texture2D;
        public static bitmapProperty:any;

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
                if (p.func) {
                    this._show[p.func].apply(this._show, [this._texture.$nativeTexture]);
                    if (System.IDE == IDE.COCOS2DX) {
                        this._show.setAnchorPoint(0, 1);
                    }
                }
                else {
                    this._show[p.atr] = this._texture.$nativeTexture;
                }
            }
            else {
                this._width = 0;
                this._height = 0;
                if (System.IDE == IDE.COCOS2DX) {
                    if (p.func) {
                        this._show[p.func].apply(this._show, [flower.Texture2D.blank.$nativeTexture]);
                    }
                    else {
                        this._show[p.atr] = flower.Texture2D.blank.$nativeTexture;
                    }
                }
                else {
                    if (p.func) {
                        this._show[p.func].apply(this._show, [null]);
                    }
                    else {
                        this._show[p.atr] = null;
                    }
                }
            }
            this.$propagateFlagsUp(10);
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

flower.Bitmap.bitmapProperty = System.Bitmap;
