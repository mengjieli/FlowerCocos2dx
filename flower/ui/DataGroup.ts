module flower {
    export class DataGroup extends flower.Group implements IViewPort {

        private _data:flower.ArrayValue;
        private _itemRenderer:any;
        private _items:Array<any>;
        private _viewer:flower.DisplayObject;
        private _viewWidth:number;
        private _viewHeight:number;
        private _contentWidth:number;
        private _contentHeight:number;

        public constructor() {
            super();
        }

        private onDataUpdate():void {
            this.$addFlag(0x400);
        }

        protected resetLayout():void {
            if (!this._viewer || !this.layout || !this.layout.fixElementSize) {
                super.resetLayout();
            }
        }

        public $onFrameEnd() {
            if (this._viewer) {
                if (this._viewWidth != this._viewer.width || this._viewHeight != this._viewer.height || this.$getFlag(0x200)) {
                    this._viewWidth = this._viewer.width;
                    this._viewHeight = this._viewer.height;
                    this.$addFlag(0x400);
                }
            }
            if (this._data && this._data.length && this._itemRenderer && (this.$getFlag(0x400))) {
                if (!this._items) {
                    this._items = [];
                }
                var list = this._data;
                var newItems = [];
                var item;
                var itemData;
                var mesureSize:boolean = false;
                if (!this._viewer || !this.layout || !this.layout.fixElementSize) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        item = null;
                        itemData = list.getItemAt(i);
                        for (var f = 0; f < this._items.length; f++) {
                            if (this._items[f].data == itemData) {
                                item = this._items[f];
                                this._items.splice(f, 1);
                                break;
                            }
                        }
                        if (item == null) {
                            item = new this._itemRenderer(itemData);
                            item.data = itemData;
                        }
                        if (item.parent == this) {
                            this.setChildIndex(item, i);
                        } else {
                            this.addChild(item);
                        }
                        newItems[i] = item;
                    }
                } else {
                    this.layout.$clear();
                    var elementWidth:number;
                    var elementHeight:number;
                    if (!this._items.length) {
                        item = new this._itemRenderer(list.getItemAt(0));
                        item.data = list.getItemAt(0);
                        this._items.push(item);
                    }
                    elementWidth = this._items[0].width;
                    elementHeight = this._items[0].height;
                    var firstItemIndex:number = this.layout.getFirstItemIndex(elementWidth, elementHeight, -this.x, -this.y);
                    firstItemIndex = firstItemIndex<0?0:firstItemIndex;
                    for (var i = firstItemIndex; i < list.length; i++) {
                        item = null;
                        itemData = list.getItemAt(i);
                        for (var f = 0; f < this._items.length; f++) {
                            if (this._items[f].data == itemData) {
                                item = this._items[f];
                                this._items.splice(f, 1);
                                break;
                            }
                        }
                        if (!item) {
                            item = new this._itemRenderer(itemData);
                            item.data = itemData;
                        }
                        if (item.parent == this) {
                            this.setChildIndex(item, i - firstItemIndex);
                        } else {
                            this.addChild(item);
                        }
                        newItems[i - firstItemIndex] = item;
                        this.layout.updateList(this._viewWidth, this._viewHeight, firstItemIndex);
                        if (this.layout.isElementsOutSize(-this.x, -this.y, this._viewWidth, this._viewHeight)) {
                            break;
                        }
                    }
                }
                mesureSize = true;
                while (this._items.length) {
                    this._items.pop().dispose();
                }
                this._items = newItems;
                this.$removeFlag(0x400);
            }
            super.$onFrameEnd();

            if (mesureSize) {
                if (!this._viewer || !this.layout || !this.layout.fixElementSize) {
                    var size = this.layout.getContentSize();
                    this._contentWidth = size.width;
                    this._contentHeight = size.height;
                    flower.Size.release(size);
                }
                else if(this._items.length) {
                    var size = this.layout.mesureSize(this._items[0].width, this._items[0].height, list.length);
                    this._contentWidth = size.width;
                    this._contentHeight = size.height;
                    flower.Size.release(size);
                }
            }
        }

        public onScroll():void {
            this.$addFlag(0x400);
        }

        //////////////////////////////////get&set//////////////////////////////////
        public get dataProvider():flower.ArrayValue {
            return this._data;
        }

        public set dataProvider(val:flower.ArrayValue) {
            if (this._data == val) {
                return;
            }
            this.removeAll();
            this._items = null;
            this._data = val;
            this.$addFlag(0x400);
            if (this._data) {
                this._data.addListener(flower.Event.UPDATE, this.onDataUpdate, this)
            }
        }

        public get itemRenderer():any {
            return this._itemRenderer;
        }

        public set itemRenderer(val:any) {
            if (this._itemRenderer == val) {
                return;
            }
            this.removeAll();
            this._items = null;
            this._itemRenderer = val;
            this.$addFlag(0x400);
        }

        public get numElements():number {
            return this._items.length;
        }

        public set viewer(display:flower.DisplayObject) {
            this._viewer = display;
        }

        public get contentWidth():number {
            return this._contentWidth;
        }

        public get contentHeight():number {
            return this._contentHeight;
        }

        public get scrollEnabled():boolean {
            return true;
        }
    }
}

