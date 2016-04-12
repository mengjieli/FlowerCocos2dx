module test {
	export class TestParser extends flower.Sprite {

		public constructor()
		{
			super();
			flower.UIParser.registerUIClass("PanelBase",test.MyPanelBase);
			var loadList:flower.URLLoaderList = new flower.URLLoaderList(["res/uxml/Button.xml","res/uxml/Panel.xml","res/uxml/ProfilePanel.xml"]);
			loadList.addListener(flower.Event.COMPLETE,this.onLoadComplete,this);
			loadList.load();
		}

		private onLoadComplete(e:flower.Event)
		{
			flower.UIParser.parse(e.data[0]);
			flower.UIParser.parse(e.data[1]);
			var panel:any = flower.UIParser.parse(e.data[2]);
			this.addChild(panel);
			trace(panel.txt1.text);
		}

	}
}

