module test {
    export class TestShape extends flower.Group {
        public constructor() {
            super();
            flower.Engine.getInstance().addChild(this);

            //var shape = new flower.Shape();
            //shape.drawRect(0, 0, 50, 50);
            //this.addChild(shape);
            //shape.x = 50;
            //shape.y = 100;

            var mask = new flower.Mask();
            this.addChild(mask);
            mask.shape.fillColor = 0xff0000;
            mask.shape.drawRect(30, 30, 100, 120);
            mask.shape.rotation = 30;
            //mask.x = 300;
            //mask.y = 300;

            var t = new flower.Shape();
            t.fillColor = 0xff0000;
            t.drawRect(0, 50, 100, 80);
            t.alpha = 0.5;
            mask.addChild(t);
            t.x = 30;
            t.y = 30;

            var label = new flower.Label();
            label.text = "123";
            label.color = 0x00ff00;
            label.x = 40;
            label.y = 40;
            this.addChild(label);

            this.addListener(flower.TouchEvent.TOUCH_END, this.onClick, this)
        }

        private onClick(e:flower.TouchEvent.TOUCH_END):void {
            trace("click", e.touchX, e.touchY, e.type);
        }
    }
}