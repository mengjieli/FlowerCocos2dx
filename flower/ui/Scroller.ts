module flower {
    export class Scroller extends MaskUI {

        private _viewport:IViewPort;
        private _viewSize:flower.Size = flower.Size.create(0, 0);
        private _startX:number;
        private _startY:number;
        private _scrollDisX = [];
        private _scrollDisY = [];
        private _scrollTime = [];
        private _lastTouchTime;
        private _throw:flower.Tween;

        public constructor() {
            super();
            flower.Component.init(this);
            var rect = new RectUI();
            rect.percentWidth = 100;
            rect.percentHeight = 100;
            this.shape = rect;
            this.addListener(flower.TouchEvent.TOUCH_BEGIN, this.touchScroller, this);
            this.addListener(flower.TouchEvent.TOUCH_MOVE, this.touchScroller, this);
            this.addListener(flower.TouchEvent.TOUCH_END, this.touchScroller, this);
            this.addListener(flower.TouchEvent.TOUCH_RELEASE, this.touchScroller, this);
        }

        private touchScroller(e:TouchEvent) {
            if (!this._viewport || e.target != this) {
                return;
            }
            var x = this.touchX;
            var y = this.touchY;
            switch (e.type) {
                case flower.TouchEvent.TOUCH_BEGIN:
                    if (this._throw) {
                        this._throw.dispose();
                        this._throw = null;
                    }
                    this._startX = x - this._viewport.x;
                    this._startY = y - this._viewport.y;
                    this._scrollDisX.length = this._scrollDisY.length = this._scrollTime.length = 0;
                    break;
                case flower.TouchEvent.TOUCH_MOVE:
                    var _x = this._viewport.x;
                    var _y = this._viewport.y;
                    if (this._viewport.contentWidth > this.width) {
                        this._viewport.x = x - this._startX;
                    }
                    if (this._viewport.contentHeight > this.height) {
                        this._viewport.y = y - this._startY;
                    }
                    this._scrollDisX.push(this._viewport.x - _x);
                    this._scrollDisY.push(this._viewport.y - _y);
                    this._scrollTime.push(Time.currentTime);
                    if (this._scrollDisX.length > 4) {
                        this._scrollDisX.shift();
                        this._scrollDisY.shift();
                        this._scrollTime.shift();
                    }
                    this._lastTouchTime = Time.currentTime;
                    break;
                case flower.TouchEvent.TOUCH_END:
                case flower.TouchEvent.TOUCH_RELEASE:
                    if (!this._scrollTime.length) {
                        trace("???");
                        break;
                    }
                    var timeGap = Time.currentTime - this._scrollTime[0];
                    var disX = 0;
                    var disY = 0;
                    for (var i = 0; i < this._scrollDisX.length; i++) {
                        disX += this._scrollDisX[i];
                        disY += this._scrollDisY[i];
                    }
                    disX = disX * 100 / timeGap;
                    disY = disY * 100 / timeGap;
                    //trace("time?",timeGap);
                    if ((disX == 0 || this._viewport.x <= 0 && -this._viewport.x + this.width <= this._viewport.contentWidth) &&
                        (disY == 0 || this._viewport.y <= 0 && -this._viewport.y + this.height <= this._viewport.contentHeight) &&
                        timeGap > 250) {
                        //trace("quit", timeGap);
                        break;
                    }
                    if (disX < -600) {
                        disX = -600;
                    }
                    if (disX > 600) {
                        disX = 600;
                    }
                    if (disY < -600) {
                        disY = -600;
                    }
                    if (disY > 600) {
                        disY = 600;
                    }
                    var toX = this._viewport.x + disX * 5;
                    var toY = this._viewport.y + disY * 5;
                    if (-toX + this.width > this._viewport.contentWidth) {
                        toX = this.width - this._viewport.contentWidth;
                    }
                    if (toX > 0) {
                        toX = 0;
                    }
                    if (-toY + this.height > this._viewport.contentHeight) {
                        toY = this.height - this._viewport.contentHeight;
                    }
                    if (toY > 0) {
                        toY = 0;
                    }
                    var timeX = Math.abs(toX - this._viewport.x) / 350;
                    var timeY = Math.abs(toY - this._viewport.y) / 350;
                    var time = timeX > timeY ? timeX : timeY;
                    if (time < 0.5) {
                        time = 0.5;
                    }
                    if (time > 5) {
                        time = 5;
                    }
                    this._throw = flower.Tween.to(this._viewport, time, {
                        x: toX,
                        y: toY
                    }, Ease.CUBIC_EASE_OUT);
                    break;
            }
        }

        protected resetUIProperty():void {
            super.resetUIProperty();
            this._viewport.width = this.width;
            this._viewport.height = this.height;
        }

        public _getMouseTarget(matrix:flower.Matrix, mutiply:boolean):flower.DisplayObject {
            var target:flower.DisplayObject = super._getMouseTarget(matrix, mutiply);
            if (target) {
                target = this;
            }
            return target;
        }

        public dispose() {
            flower.Size.release(this._viewSize);
            super.dispose();
        }

        //////////////////////////////////get&set//////////////////////////////////
        public set viewport(val:IViewPort) {
            if (this._viewport == val) {
                return;
            }
            this._viewport = val;
            this._viewport.viewer = this;
            if (this._viewport.parent != this) {
                this.addChild(this._viewport);
            }
        }

        public get viewport():IViewPort {
            return this._viewport;
        }
    }
}