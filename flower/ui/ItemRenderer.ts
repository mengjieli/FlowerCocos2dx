module flower {
    export class ItemRenderer extends flower.Group {

        private _data:any;
        private _itemIndex:any;
        private _selected:boolean = false;

        public constructor() {
            super();
            this.absoluteState = true;
        }

        public get data():any {
            return this._data;
        }

        public set data(val:any) {
            this._data = val;
            this.setData(this._data);
        }

        protected setData(val:any) {
        }

        public get itemIndex():number {
            return this._itemIndex;
        }

        $setItemIndex(val:number) {
            this._itemIndex = val;
        }

        protected setSelected(val:boolean) {
            this._selected = val;
        }

        public get selected():boolean {
            return this._selected;
        }

        public set selected(val:boolean) {
            val = !!val;
            if(this._selected == val) {
                return;
            }
            this.setSelected(val);
        }
    }
}

