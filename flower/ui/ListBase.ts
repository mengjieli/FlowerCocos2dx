module flower {
    export class ListBase extends DataGroup {

        public constructor() {
            super();
        }

        public createItem(data:any, index:number):ItemRenderer {
            var item = super.createItem(data, index);
            item.addListener(TouchEvent.TOUCH_BEGIN, this._onTouchItem, this);
            item.addListener(TouchEvent.TOUCH_END, this._onTouchItem, this);
            item.addListener(flower.TouchEvent.TOUCH_RELEASE, this._onTouchItem, this);
            if(item.data == this._selectedItem) {
                item.currentState = "selectedUp";
                item.selected = true;
            }
            return item;
        }

        protected _onTouchItem(e:TouchEvent):void {
            var item:ItemRenderer = e.currentTarget;
            switch (e.type) {
                case TouchEvent.TOUCH_BEGIN:
                    if (item == this.selectedItem) {
                        item.currentState = "selectedDown";
                    } else {
                        item.currentState = "down";
                    }
                    break;
                case TouchEvent.TOUCH_RELEASE:
                    if (item == this.selectedItem) {
                        item.currentState = "selectedUp";
                    } else {
                        item.currentState = "up";
                    }
                    break;
                case TouchEvent.TOUCH_END:
                    this._setSelectedItem(item);
                    break;
            }
            if (this._selectedItem) {
            }
        }

        protected _setSelectedItem(item:any) {
            if (item != this._selectedItem) {
                if (this._selectedItem) {
                    this._selectedItem.currentState = "up";
                    this._selectedItem.selected = false;
                }
                item.selected = true;
                this._selectedItem = item.data;
            }
            item.currentState = "selectedUp";
        }

        protected _setSelectedIndex(val:number) {

        }

        public get selectedIndex():number {
            return this._selectedItem ? this._selectedItem.itemIndex : -1;
        }

        public set selectedIndex(val:number) {
            val = +val || 0;
            if (this._selectedItem && this._selectedItem.itemIndex == val) {
                return;
            }
            this._setSelectedIndex(val);
        }

        private _selectedItem:any;
        public get selectedItem():any {
            return this._selectedItem;
        }
    }
}