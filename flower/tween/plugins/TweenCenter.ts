module flower {
	export class TweenCenter implements flower.IPlugin {

		public constructor()
		{
		}

		public init(tween:flower.Tween,propertiesTo:any,propertiesFrom:any):Array<string>
		{
			this.tween = tween;
			var target:any = tween.target;
			this.centerX = target.width / 2;
			this.centerY = target.height / 2;
			var useAttributes:Array<string> = new Array<string>();
			useAttributes.push("center");
			if("scaleX" in propertiesTo)
			{
				this.scaleXTo = +propertiesTo["scaleX"];
				useAttributes.push("scaleX");
				if(propertiesFrom && "scaleX" in propertiesFrom)
				{
					this.scaleXFrom = +propertiesFrom["scaleX"];
				}
				else
				{
					this.scaleXFrom = target["scaleX"];
				}
			}
			if("scaleY" in propertiesTo)
			{
				this.scaleYTo = +propertiesTo["scaleY"];
				useAttributes.push("scaleY");
				if(propertiesFrom && "scaleY" in propertiesFrom)
				{
					this.scaleYFrom = +propertiesFrom["scaleY"];
				}
				else
				{
					this.scaleYFrom = target["scaleY"];
				}
			}
			if("rotation" in propertiesTo)
			{
				this.rotationTo = +propertiesTo["rotation"];
				useAttributes.push("rotation");
				if(propertiesFrom && "rotation" in propertiesFrom)
				{
					this.rotationFrom = +propertiesFrom["rotation"];
				}
				else
				{
					this.rotationFrom = target["rotation"];
				}
				this.centerLength = Math.sqrt(target.width * target.width + target.height * target.height) * .5;
			}
			this.lastMoveX = this.lastMoveY = 0;
			return useAttributes;
		}

		private tween:flower.Tween;
		private scaleXFrom:number;
		private scaleYFrom:number;
		private scaleXTo:number;
		private scaleYTo:number;
		private rotationFrom:number;
		private rotationTo:number;
		private centerX:number;
		private centerY:number;
		private centerLength:number;
		private lastMoveX:number;
		private lastMoveY:number;
		public update(value:number)
		{
			var target:any = this.tween.target;
			var moveX:number = 0;
			var moveY:number = 0;
			value = 0.25;
			if(this.scaleXTo)
			{
				target.scaleX = this.scaleXFrom + (this.scaleXTo - this.scaleXFrom) * value;
				target.x = this.centerX - target.width / 2;
			}
			if(this.scaleYTo)
			{
				target.scaleY = this.scaleYFrom + (this.scaleYTo - this.scaleYFrom) * value;
				target.y = this.centerY - target.height / 2;
			}
			if(this.rotationTo)
			{
				target.rotation = this.rotationFrom + (this.rotationTo - this.rotationFrom) * value;
				moveX += this.centerX - this.centerLength * Math.cos((target.rotation + 45) * Math.PI / 180);
				moveY += this.centerY - this.centerLength * Math.sin((target.rotation + 45) * Math.PI / 180);
				target.x += moveX - this.lastMoveX;
				target.y += moveY - this.lastMoveY;
			}
			this.lastMoveX = moveX;
			this.lastMoveY = moveY;
		}

		public static scaleTo(target:any,time:number,scaleTo:number,scaleFrom:any = null,ease:string = "None"):flower.Tween
		{
			return flower.Tween.to(target,time,{"center":true,"scaleX":scaleTo,"scaleY":scaleTo},ease,scaleFrom == null?null:{"scaleX":scaleFrom,"scaleY":scaleFrom});
		}

		public static rotationTo(target:any,time:number,rotationTo:number,rotationFrom:any = null,ease:string = "None"):flower.Tween
		{
			return flower.Tween.to(target,time,{"center":true,"rotation":rotationTo},ease,rotationFrom == null?null:{"rotation":rotationFrom});
		}

	}
}

