module flower {
	export class Layout {
		public elements:Array<any> = [];
		public flag:boolean = false;

		public constructor()
		{
		}

		public addElementAt(element:flower.DisplayObject,index:number)
		{
			var len:number = this.elements.length;
			for(var i:number = 0;i < len; i++)
			{
				if(this.elements[i] == element)
				{
					this.elements.splice(i,1);
					break;
				}
			}
			this.elements.splice(index,0,element);
			this.flag = true;
		}

		public setEelementIndex(element:flower.DisplayObject,index:number)
		{
			var len:number = this.elements.length;
			for(var i:number = 0;i < len; i++)
			{
				if(this.elements[i] == element)
				{
					this.elements.splice(i,1);
					break;
				}
			}
			this.elements.splice(index,0,element);
			this.flag = true;
		}

		public removeElement(element:flower.DisplayObject)
		{
			var len:number = this.elements.length;
			for(var i:number = 0;i < len; i++)
			{
				if(this.elements[i] == element)
				{
					this.elements.splice(i,1);
					break;
				}
			}
			this.flag = true;
		}

		public removeElementAt(index:number)
		{
			this.elements.splice(index,1);
			this.flag = true;
		}

		public $setFlag()
		{
			this.flag = true;
		}

		public updateList(widt:number,height:number)
		{
		}

		public $clear()
		{
			this.elements = [];
			this.flag = false;
		}

		public static VerticalAlign:string;
		public static HorizontalAlign:string;
		public static NoneAlgin:string;
	}
}

flower.Layout.VerticalAlign = "vertical";
flower.Layout.HorizontalAlign = "horizontal";
flower.Layout.NoneAlgin = "";
