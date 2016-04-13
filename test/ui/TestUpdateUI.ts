module test {
    export class TestUpdateUI extends flower.Group {
        private url:string = "res/uxml/Panel.xml";
        private content:string = "";
        private panel:flower.Group;

        public constructor() {
            super();
            this.percentWidth = 100;
            this.percentHeight = 100;
            this.update();
            test.DebugServer.socket.register(3005, this.receiveFileChange, this);
        }

        private update():void {
            var load:flower.URLLoaderList = new flower.URLLoaderList([this.url]);
            load.addListener(flower.Event.COMPLETE, this.onLoadComplete, this);
            load.load();
        }

        private onLoadComplete(e:flower.Event):void {
            var content = e.data[0];
            if (content != this.content) {
                if (this.panel) {
                    this.panel.dispose();
                }
                this.panel = flower.UIParser.parseUI(content);
                this.addChild(this.panel);
                this.content = content;
            }
        }

        private receiveFileChange(cmd:number, msg:flower.VByteArray):void {
            var len = msg.readUInt();
            for(var i = 0; i < len; i++) {
                var url = msg.readUTF();
                var content = msg.readUTF();
                if(url == this.url) {
                    if (content != this.content) {
                        if (this.panel) {
                            this.panel.dispose();
                        }
                        this.panel = flower.UIParser.parseUI(content);
                        this.addChild(this.panel);
                        this.content = content;
                    }
                }
            }
        }
    }
}