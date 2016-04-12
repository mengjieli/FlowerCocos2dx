module test {
	export class TestUI extends flower.Sprite {

		public constructor()
		{
			super();
			flower.Engine.getInstance().addChild(this);
			this.addChild(new test.TestLayout());
			return ;
			var button:flower.Button = new flower.Button();
			button.onAdded = function ()
			{
				flower.Tween.to(this,3,{alpha:1,x:300,y:300},flower.Ease.CUBIC_EASE_IN_OUT,{alpha:0});
			}
;
			this.addChild(button);
			var group:flower.Group = new flower.Group();
			button.addChild(group);
			var image:flower.Image = new flower.Image();
			group.addChild(image);
			image.setStatePropertyValue("src","up","res/test/closeup.png");
			image.setStatePropertyValue("src","down","res/test/closedown.png");
			var label:flower.Label = new flower.Label();
			group.addChild(label);
			label.color = 0xffffff;
			label.size = 15;
			label.x = 5;
			label.y = 5;
			label.text = "未设置任何属性";
			label.setStatePropertyValue("text","up","弹起");
			label.setStatePropertyValue("text","down","按下");
			label.setStatePropertyValue("text","disabled","禁止");
			label.setStatePropertyValue("scaleX","up","1");
			label.setStatePropertyValue("scaleX","down","1.2");
			label.setStatePropertyValue("scaleX","disabled","1");
			label.setStatePropertyValue("scaleY","up","1");
			label.setStatePropertyValue("scaleY","down","1.2");
			label.setStatePropertyValue("scaleY","disabled","1");
			label.setStatePropertyValue("color","up","0xff0000");
			label.setStatePropertyValue("color","disabled","0xaaaaaa");
			this.addListener(flower.TouchEvent.TOUCH_END,function (e:flower.TouchEvent)
{
	trace("touch testui");
}
,this);
			var button2:flower.Button = new flower.Button();
			button2.x = 100;
			button2.onClick = function ()
			{
				flower.Tween.to(this,0.3,{scaleX:2,scaleY:2},flower.Ease.NONE,{scaleX:1,scaleY:1});
			}
;
			this.addChild(button2);
			var image:flower.Image = new flower.Image();
			button2.addChild(image);
			image.src = "res/test/closeup.png";
			image.setStatePropertyValue("src","up","res/test/closeup.png");
			image.setStatePropertyValue("src","down","res/test/closedown.png");
			button2.addListener(flower.TouchEvent.TOUCH_END,function (e:flower.TouchEvent)
{
	button.enabled = !button.enabled;
}
,this);
			var label:flower.Label = new flower.Label();
			button2.addChild(label);
			label.color = 0xff0000;
			label.size = 18;
			label.x = 5;
			label.y = 5;
			label.text = "未设置任何属性";
			label.setStatePropertyValue("text","up","弹起");
			label.setStatePropertyValue("text","down","按下");
			label.setStatePropertyValue("text","disabled","禁止");
		}

	}
}

