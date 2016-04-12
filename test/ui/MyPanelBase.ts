module test {
	export class MyPanelBase extends flower.Group {
		private bg:flower.Image;
		private title:flower.Label;

		public constructor()
		{
			super();
			this.bg = new flower.Image();
			this.bg.src = "res/test/panelbg.png";
			this.bg.percentWidth = 100;
			this.bg.percentHeight = 100;
			this.addChild(this.bg);
			this.title = new flower.Label();
			this.title.text = "标题";
			this.title.color = 0x00ff00;
			this.title.x = 100;
			this.title.horizontalCenterAlgin = "center";
			this.title.horizontalCenter = 0;
			this.addChild(this.title);
			this.onAdded = function ()
			{
				flower.Tween.to(this,0.4,{scaleX:1,scaleY:1,x:this.x,y:this.y},flower.Ease.CUBIC_EASE_IN_OUT,{scaleX:0,scaleY:0,x:this.x + this.width / 2,y:this.y + this.height / 2});
				this.title.text = "谁说这个居中不凶的啊?";
			}
;
			this.addListener(flower.TouchEvent.TOUCH_END,function (e:flower.TouchEvent)
{
	this.title.text = "随机数:" + Math.floor(Math.random() * 100000000);
	this.title.x = Math.random() * 100;
}
,this);
		}

	}
}

