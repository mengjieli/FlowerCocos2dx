module flower {
	export class IOErrorEvent extends flower.Event {
		public static ERROR:string;
		public message:string;

		public constructor(type:string,message:string)
		{
			super(type);
		}

	}
}

flower.IOErrorEvent.ERROR = "error";
