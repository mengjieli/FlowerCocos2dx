module flower {
	export class LinearLayoutBase extends flower.Layout {
		private _fixElementSize:boolean = false;
		private _gap:number = 0;
		private _horizontalAlign:string = "";
		private _verticalAlign:string = "";

		public constructor()
		{
			super();
		}

		public updateList(widt:number,height:number)
		{
			if(!this.flag)
			{
				return ;
			}
			var list:Array<any> = this.elements;
			var len:number = list.length;
			if(!len)
			{
				return ;
			}
			var i:number;
			if(this._verticalAlign == flower.Layout.VerticalAlign)
			{
				if(this._fixElementSize)
				{
					var eh:number = list[0].height;
					for(i = 0; i < len; i++)
					{
						list[i].y = i * (eh + this._gap);
					}
				}
				else
				{
					var y:number = 0;
					for(i = 0; i < len; i++)
					{
						list[i].y = y;
						y += list[i].height + this._gap;
					}
				}
			}
			if(this._horizontalAlign == flower.Layout.HorizontalAlign)
			{
				if(this._fixElementSize)
				{
					var ew:number = list[0].width;
					for(i = 0; i < len; i++)
					{
						list[i].x = i * (ew + this._gap);
					}
				}
				else
				{
					var x:number = 0;
					for(i = 0; i < len; i++)
					{
						list[i].x = x;
						x += list[i].width + this._gap;
					}
				}
			}
		}

		public get fixElementSize():boolean
		{
			return this._fixElementSize;
		}

		public set fixElementSize(val:boolean)
		{
			this._fixElementSize = !!val;
		}

		public get gap():number
		{
			return this._gap;
		}

		public set gap(val:number)
		{
			val = +val || 0;
			this._gap = val;
		}

		public get horizontalAlign():string
		{
			return this._horizontalAlign;
		}

		public set horizontalAlign(val:string)
		{
			this._horizontalAlign = val;
		}

		public get verticalAlign():string
		{
			return this._verticalAlign;
		}

		public set verticalAlign(val:string)
		{
			this._verticalAlign = val;
		}

	}
}

