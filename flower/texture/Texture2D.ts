module flower {
	export class Texture2D {
		private _width:number;
		private _height:number;
		private _url:string;
		private _nativeURL:string;
		public $count:number;
		private _nativeTexture:any;
		private _hasDispose:boolean = false;

		public constructor(nativeTexture:any,url:string,nativeURL:string,w:number,h:number)
		{
			this._nativeTexture = nativeTexture;
			this._url = url;
			this._nativeURL = nativeURL;
			this.$count = 0;
			this._width = w;
			this._height = h;
		}

		public $dispose()
		{
			if(flower.Texture2D.safeLock == true)
			{
				flower.DebugInfo.debug("|释放纹理| 操作失败，此方法提供内部结构使用，外部禁止使用，请用TextureManager.disposeTexure()代替，url:" + this.url,flower.DebugInfo.ERROR);
				return ;
			}
			if(this.$count != 0)
			{
				flower.DebugInfo.debug("|释放纹理| 纹理计数器不为0，此纹理不会被释放，计数为 " + this.$count + "，地址为" + this.url,flower.DebugInfo.ERROR);
				return ;
			}
			System.disposeTexture(this._nativeTexture,this._nativeURL);
			this._nativeTexture = null;
			if(flower.Engine.TIP)
			{
				flower.DebugInfo.debug("|释放纹理| " + this.url,flower.DebugInfo.TIP);
			}
			this._hasDispose = true;
		}

		public $addCount()
		{
			this.$count++;
		}

		public $delCount()
		{
			this.$count--;
			if(this.$count < 0)
			{
				this.$count = 0;
			}
			if(this.$count == 0)
			{
				if(flower.Engine.DEBUG && this == flower.Texture2D.blank)
				{
					flower.DebugInfo.debug2(flower.DebugInfo.ERROR,"空白图像被释放了");
					return ;
				}
			}
		}

		public getCount():number
		{
			return this.$count;
		}

		public get url():string
		{
			return this._url;
		}

		public get nativeURL():string
		{
			return this._nativeURL;
		}

		public get width():number
		{
			return this._width;
		}

		public get height():number
		{
			return this._height;
		}

		public get hasDispose():boolean
		{
			return this._hasDispose;
		}

		public get $nativeTexture():any
		{
			return this._nativeTexture;
		}

		public static safeLock:boolean;
		public static blank:flower.Texture2D;
	}
}

flower.Texture2D.safeLock = true;
