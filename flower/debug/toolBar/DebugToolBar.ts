module flower {
	export class DebugToolBar extends flower.Sprite {
		private image:flower.Image;
		private image2:flower.Image;

		public constructor()
		{
			super();
			var label:flower.Label = new flower.Label();
			label.text = "我是";
			label.color = 0xff0000;
			label.addListener(flower.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
			this.addListener(flower.TouchEvent.TOUCH_BEGIN,this.onBegin2,this);
			this.addChild(label);
			this.image = new flower.Image("res/fight/testplist.png");
			this.addChild(this.image);
			this.image.x = 100;
			this.image.y = 100;
			this.image.scaleX = 2;
			this.image.scaleY = 3;
			var load:flower.URLLoader = new flower.URLLoader("res/paike.json");
			load.load();
			load.addListener(flower.Event.COMPLETE,this.loadConfigComplete,this);
			var load:flower.URLLoader = new flower.URLLoader("res/paike.json");
			load.load();
			load.addListener(flower.Event.COMPLETE,this.loadConfigComplete,this);
		}

		private loadConfigComplete(e:flower.Event)
		{
			trace(flower.ObjectDo.toString(e.data));
		}

		private onBegin(e:flower.TouchEvent)
		{
			trace("click label");
		}

		private onBegin2(e:flower.TouchEvent)
		{
			trace("click tool bar");
			if(this.image)
			{
				this.image.dispose();
				this.image = null;
				if(this.image2)
				{
					this.image2.dispose();
					this.image2 = null;
				}
			}
			else
			{
				this.image = new flower.Image("res/fight/ui/12081015.png");
				this.addChild(this.image);
				this.addChild(this.image);
				this.image2 = new flower.Image("res/fight/ui/12081015.png");
				this.addChild(this.image2);
				this.addChild(this.image2);
				this.image2.x = 100;
				this.image2.y = 100;
			}
		}

	}
}

