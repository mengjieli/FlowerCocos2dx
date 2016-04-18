 class Flower extends Sprite {

	public constructor()
	{
		super();
		if(System.IDE == "flash")
		{
			System.stage = this["stage"];
			flower.Res.local = false;
			flower.Res.serverURL = "http://localhost:5000/";
		}
		else
		{
			flower.Res.local = true;
			flower.Res.localURL = "";
		}
		var engine = new flower.Engine();
		engine.addListener(flower.Event.READY,this.onEngineReady,this);
	}

	 private onEngineReady() {
		 new test.TestCase();
	 }
}

