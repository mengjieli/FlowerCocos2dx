module flower {
	export class DataGroup extends flower.Group {
		private _data:flower.ArrayValue;
		private _itemRender:any;
		private items:Array<any> = [];

		public constructor()
		{
			super();
		}

		public get dataProvider():flower.ArrayValue
		{
			return this._data;
		}

		public set dataProvider(val:flower.ArrayValue)
		{
			this._data = val;
		}

		public get itemRender():any
		{
			return this._itemRender;
		}

		public set itemRender(val:any)
		{
			this._itemRender = val;
		}

		public get numElements():number
		{
			return this.items.length;
		}

	}
}

