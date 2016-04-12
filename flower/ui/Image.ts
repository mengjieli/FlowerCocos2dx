module flower {
	export class Image extends flower.Bitmap {
		private _loader:flower.URLLoader;
		private _source:any;

		public constructor(source:any = null)
		{
			super();
			if(source)
			{
				this.setSource(source);
			}
			this._nativeClass = "UI";
			this.addUIEvents();
		}

		private setSource(val:any)
		{
			if(this._loader)
			{
				this._loader.dispose();
				this._loader = null;
			}
			if(val instanceof flower.Texture2D)
			{
				this.texture = val;
			}
			else
			{
				this._loader = new flower.URLLoader(val);
				this._loader.load();
				this._loader.addListener(flower.Event.COMPLETE,this.onLoadTextureComplete,this);
			}
		}

		public _setTexture(val:flower.Texture2D)
		{
			super._setTexture(val);
			this.$addFlag(10);
		}

		public dispose()
		{
			for(var key in this._binds)
			{
				this._binds[key].dispose();
			}
			this._binds = null;
			super.dispose();
		}

		public set src(val:any)
		{
			if(this._source == val)
			{
				return ;
			}
			this._source = val;
			this.setSource(val);
		}

		public get src():any
		{
			return this._source;
		}

		private onLoadTextureComplete(e:flower.Event)
		{
			this.texture = e.data;
		}

		public addUIEvents()
		{
			this.addListener(flower.Event.ADDED,this.onEXEAdded,this);
		}

		private onAddedEXE:Function;
		public set onAdded(val:Function)
		{
			this.onAddedEXE = val;
		}

		public get onAdded():Function
		{
			return this.onAddedEXE;
		}

		private onEXEAdded(e:flower.Event)
		{
			if(this.onAddedEXE && e.target == this)
			{
				this.onAddedEXE.call(this);
			}
		}

		private _binds:any = {};
		public bindProperty(property:string,content:string,checks:Array<any> = null)
		{
			if(this._binds[property])
			{
				this._binds[property].dispose();
			}
			this._binds[property] = new flower.Binding(this,checks,property,content);
		}

		public removeBindProperty(property:string)
		{
			if(this._binds[property])
			{
				this._binds[property].dispose();
				delete this._binds[property];
			}
		}

		public $state:flower.StringValue = new flower.StringValue();
		public get currentState():string
		{
			return this.$state.value;
		}

		public set currentState(val:string)
		{
			if(this.$state.value == val)
			{
				return ;
			}
			this.$state.value = val;
		}

		private _propertyValues:any;
		public setStatePropertyValue(property:string,state:string,val:string,checks:Array<any> = null)
		{
			if(!this._propertyValues)
			{
				this._propertyValues = {};
				if(!this._propertyValues[property])
				{
					this._propertyValues[property] = {};
				}
				this.bindProperty("currentState","{this.changeState($state)}");
				this._propertyValues[property][state] = {"value":val,"checks":checks};
			}
			else
			{
				if(!this._propertyValues[property])
				{
					this._propertyValues[property] = {};
				}
				this._propertyValues[property][state] = {"value":val,"checks":checks};
			}
			if(state == this.currentState)
			{
				this.removeBindProperty(property);
				this.bindProperty(property,val);
			}
		}

		public changeState(state:string):string
		{
			if(!this._propertyValues)
			{
				return this.currentState;
			}
			for(var property in this._propertyValues)
			{
				if(this._propertyValues[property][state])
				{
					this.removeBindProperty(property);
					this.bindProperty(property,this._propertyValues[property][state].value,this._propertyValues[property][state].checks);
				}
			}
			return this.currentState;
		}

		private _topAlgin:string = "";
		private _bottomAlgin:string = "";
		private _leftAlgin:string = "";
		private _rightAlgin:string = "";
		private _horizontalCenterAlgin:string = "";
		private _verticalCenterAlgin:string = "";
		private _top:number = 0;
		private _bottom:number = 0;
		private _left:number = 0;
		private _right:number = 0;
		private _horizontalCenter:number = 0;
		private _verticalCenter:number = 0;
		private _percentWidth:number = -1;
		private _percentHeight:number = -1;
		public get topAlgin():string
		{
			return this._topAlgin;
		}

		public set topAlgin(val:string)
		{
			if(flower.Engine.DEBUG)
			{
				if(val != "" && val != "top" && val != "bottom")
				{
					flower.DebugInfo.debug("非法的 topAlgin 值:" + val + "，只能为 \"\" 或 \"top\" 或 \"bottom\"",flower.DebugInfo.ERROR);
				}
			}
			this._topAlgin = val;
			this.$addFlag(10);
		}

		public get top():number
		{
			return this._top;
		}

		public set top(val:number)
		{
			this._top = +val || 0;
			this.$addFlag(10);
		}

		public get bottomAlgin():string
		{
			return this._bottomAlgin;
		}

		public set bottomAlgin(val:string)
		{
			if(flower.Engine.DEBUG)
			{
				if(val != "" && val != "top" && val != "bottom")
				{
					flower.DebugInfo.debug("非法的 bottomAlgin 值:" + val + "，只能为 \"\" 或 \"top\" 或 \"bottom\"",flower.DebugInfo.ERROR);
				}
			}
			this._bottomAlgin = val;
			this.$addFlag(10);
		}

		public get bottom():number
		{
			return this._bottom;
		}

		public set bottom(val:number)
		{
			this._bottom = +val || 0;
			this.$addFlag(10);
		}

		public get leftAlgin():string
		{
			return this._leftAlgin;
		}

		public set leftAlgin(val:string)
		{
			if(flower.Engine.DEBUG)
			{
				if(val != "" && val != "left" && val != "right")
				{
					flower.DebugInfo.debug("非法的 leftAlgin 值:" + val + "，只能为 \"\" 或 \"left\" 或 \"right\"",flower.DebugInfo.ERROR);
				}
			}
			this._leftAlgin = val;
			this.$addFlag(10);
		}

		public get left():number
		{
			return this._left;
		}

		public set left(val:number)
		{
			this._left = +val || 0;
			this.$addFlag(10);
		}

		public get rightAlgin():string
		{
			return this._rightAlgin;
		}

		public set rightAlgin(val:string)
		{
			if(flower.Engine.DEBUG)
			{
				if(val != "" && val != "left" && val != "right")
				{
					flower.DebugInfo.debug("非法的 rightAlgin 值:" + val + "，只能为 \"\" 或 \"left\" 或 \"right\"",flower.DebugInfo.ERROR);
				}
			}
			this._rightAlgin = val;
			this.$addFlag(10);
		}

		public get right():number
		{
			return this._right;
		}

		public set right(val:number)
		{
			this._right = val;
			this.$addFlag(10);
		}

		public set horizontalCenterAlgin(val:string)
		{
			if(flower.Engine.DEBUG)
			{
				if(val != "" && val != "center")
				{
					flower.DebugInfo.debug("非法的 horizontalCenterAlgin 值:" + val + "，只能为 \"\" 或 \"center\"",flower.DebugInfo.ERROR);
				}
			}
			this._horizontalCenterAlgin = val;
			this.$addFlag(10);
		}

		public get horizontalCenter():number
		{
			return this._horizontalCenter;
		}

		public set horizontalCenter(val:number)
		{
			this._horizontalCenter = val;
			this.$addFlag(10);
		}

		public set verticalCenterAlgin(val:string)
		{
			if(flower.Engine.DEBUG)
			{
				if(val != "" && val != "center")
				{
					flower.DebugInfo.debug("非法的 verticalCenterAlgin 值:" + val + "，只能为 \"\" 或 \"center\"",flower.DebugInfo.ERROR);
				}
			}
			this._verticalCenterAlgin = val;
			this.$addFlag(10);
		}

		public get verticalCenter():number
		{
			return this._verticalCenter;
		}

		public set verticalCenter(val:number)
		{
			this._verticalCenter = val;
			this.$addFlag(10);
		}

		public get percentWidth():number
		{
			return this._percentWidth < 0?0:this._percentWidth;
		}

		public set percentWidth(val:number)
		{
			val = +val;
			val = val < 0?0:val;
			this._percentWidth = val;
			this.$addFlag(10);
		}

		public get percentHeight():number
		{
			return this._percentHeight < 0?0:this._percentHeight;
		}

		public set percentHeight(val:number)
		{
			val = +val;
			val = val < 0?0:val;
			this._percentHeight = val;
			this.$addFlag(10);
		}

		public $onFrameEnd()
		{
			super.$onFrameEnd();
			if(this.$getFlag(10) || this.parent.$getFlag(10))
			{
				this.$removeFlag(10);
				if(this._percentWidth >= 0)
				{
					this.width = this.parent.width * this._percentWidth / 100;
				}
				if(this._percentHeight >= 0)
				{
					this.height = this.parent.height * this._percentHeight / 100;
				}
				if(this._topAlgin != "")
				{
					if(this._topAlgin == "top")
					{
						this.y = this._top;
					}
					else if(this._topAlgin == "bottom")
					{
						this.y = this.parent.height - this._top;
					}
					if(this._bottomAlgin != "")
					{
						if(this._bottomAlgin == "top")
						{
							this.height = this.bottom - this._y;
						}
						else if(this._bottomAlgin == "bottom")
						{
							this.height = this.parent.height - this.bottom - this._y;
						}
					}
				}
				else
				{
					if(this._bottomAlgin != "")
					{
						if(this._bottomAlgin == "top")
						{
							this.y = this._bottom - this._height * this.scaleY;
						}
						else if(this._bottomAlgin == "bottom")
						{
							this.y = this.parent.height - this._bottom - this._height * this.scaleY;
						}
					}
				}
				if(this._verticalCenterAlgin != "")
				{
					this.y = (this.parent.height - this.height * this.scaleY) * .5 + this._verticalCenter;
				}
				if(this._leftAlgin != "")
				{
					if(this._leftAlgin == "left")
					{
						this.x = this._left;
					}
					else if(this._leftAlgin == "right")
					{
						this.x = this.parent.width - this._left;
					}
					if(this._rightAlgin != "")
					{
						if(this._rightAlgin == "left")
						{
							this.width = this._right - this._x;
						}
						else if(this._rightAlgin == "right")
						{
							this.width = this.parent.width - this._right - this._x;
						}
					}
				}
				else
				{
					if(this._rightAlgin != "")
					{
						if(this._rightAlgin == "left")
						{
							this.x = this._right - this._width * this.scaleX;
						}
						else if(this._rightAlgin == "right")
						{
							this.x = this.parent.width - this._right - this._width * this.scaleX;
						}
					}
				}
				if(this._horizontalCenterAlgin != "")
				{
					this.x = (this.parent.width - this.width * this.scaleX) * .5 + this._horizontalCenter;
				}
			}
		}

	}
}

