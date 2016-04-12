module flower {
	export class Sprite extends flower.DisplayObject implements flower.DisplayObjectContainer {
		public _childs:Array<flower.DisplayObject> = new Array<flower.DisplayObject>();
		public static displayObjectContainerProperty:any;

		public constructor()
		{
			super();
			this._show = System.getNativeShow("DisplayObjectContainer");
			this._nativeClass = "DisplayObjectContainer";
		}

		public addChild(child:flower.DisplayObject)
		{
			if(child.parent)
				child.parent.removeChild(child);
			this._childs.push(child);
			child.$parentAlpha = this.$parentAlpha * this.alpha;
			child.$setParent(this);
			child.$onAddToStage(this.stage,this._nestLevel + 1);
			this.$addFlag(3);
			this.$propagateFlagsUp(4);
		}

		public getChildAt(index:number):flower.DisplayObject
		{
			index = +index & ~0;
			return this._childs[index];
		}

		public addChildAt(child:flower.DisplayObject,index:number = 0)
		{
			if(child.parent == this)
			{
				this.setChildIndex(child,index);
			}
			else
			{
				if(child.parent)
					child.parent.removeChild(child);
				this._childs.splice(index,0,child);
				child.$parentAlpha = this.$parentAlpha * this.alpha;
				child.$setParent(this);
				child.$onAddToStage(this.stage,this._nestLevel + 1);
				this.$addFlag(3);
				this.$propagateFlagsUp(4);
			}
		}

		public removeChild(child:flower.DisplayObject)
		{
			for(var i:number = 0;i < this._childs.length; i++)
			{
				if(this._childs[i] == child)
				{
					this._childs.splice(i,1);
					child.$parentAlpha = 1;
					child.$setParent(null);
					child.$onRemoveFromStage();
					this.$addFlag(3);
					this.$propagateFlagsUp(4);
					return ;
				}
			}
		}

		public removeChildAt(index:number)
		{
			var child:flower.DisplayObject = this._childs.splice(index,1)[0];
			child.$parentAlpha = 1;
			child.$setParent(null);
			child.$onRemoveFromStage();
			this.$addFlag(3);
			this.$propagateFlagsUp(4);
		}

		public setChildIndex(child:flower.DisplayObject,index:number)
		{
			var childIndex:number = this.getChildIndex(child);
			if(childIndex == index)
			{
				return ;
			}
			this._childs.splice(childIndex,1);
			this._childs.splice(index,0,child);
			this.$addFlag(3);
		}

		private _resetChildIndex()
		{
			var i:number;
			if(System.IDE == "cocos2dx")
			{
				for(i = 0; i < this._childs.length; i++)
				{
					this._childs[i].$nativeShow["setLocalZOrder"].apply(this._childs[i].$nativeShow,[i]);
				}
			}
			else
			{
				var p:any = flower.Sprite.displayObjectContainerProperty.setChildIndex;
				for(i = 0; i < this._childs.length; i++)
				{
					this._show[p.func].apply(this._show,[this._childs[i].$nativeShow,i]);
				}
			}
		}

		public getChildIndex(child:flower.DisplayObject):number
		{
			for(var i:number = 0;i < this._childs.length; i++)
			{
				if(this._childs[i] == child)
				{
					return i;
				}
			}
			return null;
		}

		public contains(child:flower.DisplayObject):boolean
		{
			if(child.parent == this)
				return true;
			return false;
		}

		public _alphaChange()
		{
			for(var i:number = 0;i < this._childs.length; i++)
			{
				this._childs[i].$parentAlpha = this.$parentAlpha * this.alpha;
			}
		}

		public $getSize()
		{
			this.$removeFlag(1);
		}

		public $onFrameEnd()
		{
			if(this.$getFlag(3))
			{
				this._resetChildIndex();
			}
			for(var i:number = 0,len:number = this._childs.length;i < len; i++)
			{
				this._childs[i].$onFrameEnd();
			}
		}

		public dispose()
		{
			while(this._childs.length)
			{
				this._childs[0].dispose();
			}
			if(this.parent)
			{
				this.parent.removeChild(this);
			}
		}

		public _getMouseTarget(matrix:flower.Matrix,mutiply:boolean):flower.DisplayObject
		{
			if(this._touchEnabled == false || this._visible == false)
				return null;
			if(mutiply == true && this._mutiplyTouchEnabled == false)
				return null;
			matrix.save();
			matrix.translate(-this.x,-this.y);
			if(this.rotation)
				matrix.rotate(-this.radian);
			if(this.scaleX != 1 || this.scaleY != 1)
			{
				matrix.scale(1 / this.scaleX,1 / this.scaleY);
			}
			this._touchX = matrix.tx;
			this._touchY = matrix.ty;
			var target:flower.DisplayObject;
			var len:number = this._childs.length;
			for(var i:number = len - 1;i >= 0; i--)
			{
				if(this._childs[i].touchEnabled && (mutiply == false || (mutiply == true && this._childs[i].mutiplyTouchEnabled == true)))
				{
					if(this._childs[i] instanceof flower.Sprite)
					{
						target = (<flower.Sprite>this._childs[i])._getMouseTarget(matrix,mutiply);
						if(target != null)
							break;
					}
					else if(this._childs[i].$isMouseTarget(matrix,mutiply) == true)
					{
						target = <flower.DisplayObject>this._childs[i];
						break;
					}
				}
			}
			matrix.restore();
			return target;
		}

		public get numChildren():number
		{
			return this._childs.length;
		}

		public get mesureWidth():number
		{
			var sx:number = 0;
			var ex:number = 0;
			for(var child_key_a in this._childs)
			{
				var child:any = this._childs[child_key_a];
				if(child.x < sx)
				{
					sx = child.x;
				}
				if(child.x + child.width > ex)
				{
					ex = child.x + child.width;
				}
			}
			return Math.floor(ex - sx);
		}

		public get mesureHeight():number
		{
			var sy:number = 0;
			var ey:number = 0;
			for(var child_key_a in this._childs)
			{
				var child:any = this._childs[child_key_a];
				if(child.y < sy)
				{
					sy = child.y;
				}
				if(child.y + child.width > ey)
				{
					ey = child.y + child.height;
				}
			}
			return Math.floor(ey - sy);
		}

	}
}

flower.Sprite.displayObjectContainerProperty = System.DisplayObjectContainer;
