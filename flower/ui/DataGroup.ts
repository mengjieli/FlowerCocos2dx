module flower {
    export class DataGroup extends flower.Group {

        private _data:flower.ArrayValue;
        private _itemRender:any;
        private _items:Array<any>;
        private _mesureSize:Array<any>;
        private _showSize:flower.Point;

        public constructor() {
            super();
        }

        private onDataUpdate():void {
            this.$addFlag(0x400);
        }

        public $flushItems() {
            if (this._data && this._itemRender && this.$getFlag(0x400)) {
                var list = this._data;
                if (!this._mesureSize) {
                    this._mesureSize = [];
                    for (var i = 0; i < this._data.length; i++) {
                        this._mesureSize[i] = {
                            "mesure": true,
                            "width": 0,
                            "height": 0
                        }
                    }
                }
            }
        }

        public $onFrameEnd() {
            if (this._data && this._itemRender && this.$getFlag(0x400) && !this._showSize) {
                if (!this._items) {
                    this._items = [];
                }
                var list = this._data;
                var newItems = [];
                var item;
                for (var i = 0, len = list.length; i < len; i++) {
                    item = null;
                    for (var f = 0; f < this._items.length; f++) {
                        if (this._items[f] == list[i]) {
                            item = this._items[f];
                            this._items.splice(f, 1);
                            break;
                        }
                    }
                    if (item == null) {
                        item = new this._itemRender(list.getItemAt(i));
                        item.data = list.getItemAt(i);
                    }
                    if (item.parent == this) {
                        this.setChildIndex(item, i);
                    } else {
                        this.addChild(item);
                    }
                    newItems[i] = item;
                }
                while (this._items.length) {
                    this._items.pop().dispose();
                }
                this._items = newItems;
                this.$removeFlag(0x400);
            }
            super.$onFrameEnd();
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
            this._mesureSize = null;
            if (this._data) {
                this._data.addListener(flower.Event.UPDATE, this.onDataUpdate, this)
            }
        }

        public get itemRender():any {
            return this._itemRender;
        }

        public set itemRender(val:any) {
            if (this._itemRender == val) {
                return;
            }
            this.removeAll();
            this._items = null;
            this._itemRender = val;
            this.$addFlag(0x400);
            this._mesureSize = null;
        }

        public get numElements():number {
            return this._items.length;
        }

    }
}

