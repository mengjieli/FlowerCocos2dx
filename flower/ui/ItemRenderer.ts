module flower {
    export class ItemRenderer extends flower.Group {

        private _data:any;
        private _itemIndex:any;
        private _selected:boolean = false;

        public constructor() {
            super();
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

        public $setItemIndex(val:number) {
            this._itemIndex = val;
        }

        public get selected():boolean {
            return this._selected;
        }

    }
}

