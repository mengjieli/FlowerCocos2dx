module flower {
	export class Ease {
		public static NONE:string;
		public static SINE_EASE_IN:string;
		public static SineEaseOut:string;
		public static SINE_EASE_IN_OUT:string;
		public static SineEaseOutIn:string;
		public static QUAD_EASE_IN:string;
		public static QUAD_EASE_OUT:string;
		public static QUAD_EASE_IN_OUT:string;
		public static QUAD_EASE_OUT_IN:string;
		public static CUBIC_EASE_IN:string;
		public static CUBIC_EASE_OUT:string;
		public static CUBIC_EASE_IN_OUT:string;
		public static CUBIC_EASE_OUT_IN:string;
		public static QUART_EASE_IN:string;
		public static QUART_EASE_OUT:string;
		public static QUART_EASE_IN_OUT:string;
		public static QUART_EASE_OUT_IN:string;
		public static QUINT_EASE_IN:string;
		public static QUINT_EASE_OUT:string;
		public static QUINT_EASE_IN_OUT:string;
		public static QUINT_EASE_OUT_IN:string;
		public static EXPO_EASE_IN:string;
		public static EXPO_EASE_OUT:string;
		public static EXPO_EASE_IN_OUT:string;
		public static EXPO_EASE_OUT_IN:string;
		public static CIRC_EASE_IN:string;
		public static CIRC_EASE_OUT:string;
		public static CIRC_EASE_IN_OUT:string;
		public static CIRC_EASE_OUT_IN:string;
		public static BACK_EASE_IN:string;
		public static BACK_EASE_OUT:string;
		public static BACK_EASE_IN_OUT:string;
		public static BACK_EASE_OUT_IN:string;
		public static ELASTIC_EASE_IN:string;
		public static ELASTIC_EASE_OUT:string;
		public static ELASTIC_EASE_IN_OUT:string;
		public static ELASTIC_EASE_OUT_IN:string;
		public static BOUNCE_EASE_IN:string;
		public static BounceEaseOut:string;
		public static BOUNCE_EASE_IN_OUT:string;
		public static BOUNCE_EASE_OUT_IN:string;
		public static registerEaseFunction(name:string,ease:Function)
		{
			flower.EaseFunction[name] = ease;
		}

	}
}

flower.Ease.NONE = "None";
flower.Ease.SINE_EASE_IN = "SineEaseIn";
flower.Ease.SineEaseOut = "SineEaseOut";
flower.Ease.SINE_EASE_IN_OUT = "SineEaseInOut";
flower.Ease.SineEaseOutIn = "SineEaseOutIn";
flower.Ease.QUAD_EASE_IN = "QuadEaseIn";
flower.Ease.QUAD_EASE_OUT = "QuadEaseOut";
flower.Ease.QUAD_EASE_IN_OUT = "QuadEaseInOut";
flower.Ease.QUAD_EASE_OUT_IN = "QuadEaseOutIn";
flower.Ease.CUBIC_EASE_IN = "CubicEaseIn";
flower.Ease.CUBIC_EASE_OUT = "CubicEaseOut";
flower.Ease.CUBIC_EASE_IN_OUT = "CubicEaseInOut";
flower.Ease.CUBIC_EASE_OUT_IN = "CubicEaseOutIn";
flower.Ease.QUART_EASE_IN = "QuartEaseIn";
flower.Ease.QUART_EASE_OUT = "QuartEaseOut";
flower.Ease.QUART_EASE_IN_OUT = "QuartEaseInOut";
flower.Ease.QUART_EASE_OUT_IN = "QuartEaseOutIn";
flower.Ease.QUINT_EASE_IN = "QuintEaseIn";
flower.Ease.QUINT_EASE_OUT = "QuintEaseOut";
flower.Ease.QUINT_EASE_IN_OUT = "QuintEaseInOut";
flower.Ease.QUINT_EASE_OUT_IN = "QuintEaseOutIn";
flower.Ease.EXPO_EASE_IN = "ExpoEaseIn";
flower.Ease.EXPO_EASE_OUT = "ExpoEaseOut";
flower.Ease.EXPO_EASE_IN_OUT = "ExpoEaseInOut";
flower.Ease.EXPO_EASE_OUT_IN = "ExpoEaseOutIn";
flower.Ease.CIRC_EASE_IN = "CircEaseIn";
flower.Ease.CIRC_EASE_OUT = "CircEaseOut";
flower.Ease.CIRC_EASE_IN_OUT = "CircEaseInOut";
flower.Ease.CIRC_EASE_OUT_IN = "CircEaseOutIn";
flower.Ease.BACK_EASE_IN = "BackEaseIn";
flower.Ease.BACK_EASE_OUT = "BackEaseOut";
flower.Ease.BACK_EASE_IN_OUT = "BackEaseInOut";
flower.Ease.BACK_EASE_OUT_IN = "BackEaseOutIn";
flower.Ease.ELASTIC_EASE_IN = "ElasticEaseIn";
flower.Ease.ELASTIC_EASE_OUT = "ElasticEaseOut";
flower.Ease.ELASTIC_EASE_IN_OUT = "ElasticEaseInOut";
flower.Ease.ELASTIC_EASE_OUT_IN = "ElasticEaseOutIn";
flower.Ease.BOUNCE_EASE_IN = "BounceEaseIn";
flower.Ease.BounceEaseOut = "BounceEaseOut";
flower.Ease.BOUNCE_EASE_IN_OUT = "BounceEaseInOut";
flower.Ease.BOUNCE_EASE_OUT_IN = "BounceEaseOutIn";
