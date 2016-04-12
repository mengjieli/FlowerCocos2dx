module flower {
	export class Event {
		private $type:string;
		private $bubbles:boolean;
		private $cycle:boolean = false;
		public $target:any = null;
		public $currentTarget:any = null;
		public data:any;
		private _isPropagationStopped:boolean = false;

		public constructor(type:string,bubbles:boolean = false)
		{
			this.$type = type;
			this.$bubbles = bubbles;
		}

		public stopPropagation()
		{
			this._isPropagationStopped = true;
		}

		public get isPropagationStopped():boolean
		{
			return this._isPropagationStopped;
		}

		public get type():string
		{
			return this.$type;
		}

		public get bubbles():boolean
		{
			return this.$bubbles;
		}

		public get target():any
		{
			return this.$target;
		}

		public get currentTarget():any
		{
			return this.$currentTarget;
		}

		public static READY:string;
		public static COMPLETE:string;
		public static ADDED:string;
		public static REMOVED:string;
		public static ADDED_TO_STAGE:string;
		public static REMOVED_FROM_STAGE:string;
		public static CONNECT:string;
		public static CLOSE:string;
		public static ERROR:string;
		public static _eventPool:Array<flower.Event>;
		public static create(type:string,data:any = null):flower.Event
		{
			var e:flower.Event;
			if(!flower.Event._eventPool.length)
			{
				e = new flower.Event(type);
			}
			else
			{
				e = flower.Event._eventPool.pop();
				e.$cycle = false;
			}
			e.$type = type;
			e.$bubbles = false;
			e.data = data;
			return e;
		}

		public static release(e:flower.Event)
		{
			if(e.$cycle)
			{
				return ;
			}
			e.$cycle = true;
			flower.Event._eventPool.push(e);
		}

	}
}

flower.Event.READY = "ready";
flower.Event.COMPLETE = "complete";
flower.Event.ADDED = "added";
flower.Event.REMOVED = "removed";
flower.Event.ADDED_TO_STAGE = "added_to_stage";
flower.Event.REMOVED_FROM_STAGE = "removed_from_stage";
flower.Event.CONNECT = "connect";
flower.Event.CLOSE = "close";
flower.Event.ERROR = "error";
flower.Event._eventPool = new Array<flower.Event>();
