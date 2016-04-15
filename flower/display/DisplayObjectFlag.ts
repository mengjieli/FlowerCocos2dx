module flower {
	export class DisplayObjectFlag {
		public static SIZE:number;
		public static NATIVE_TEXT:number;
		public static DISPLAYOBJECT_CONTAINER_INDEX:number;
		public static DISPLAYOBJECT_CONTAINER_SIZE:number;
		public static COMPONENT_POSITION:number;
		public static SHAPE_ALPHA_CHANGE:number;
		public static DATA_GROUP_CHANGE:number;
	}
}

flower.DisplayObjectFlag.SIZE = 0x1;
flower.DisplayObjectFlag.NATIVE_TEXT = 0x2;
flower.DisplayObjectFlag.DISPLAYOBJECT_CONTAINER_INDEX = 0x4;
flower.DisplayObjectFlag.DISPLAYOBJECT_CONTAINER_SIZE = 0x8;
flower.DisplayObjectFlag.SHAPE_ALPHA_CHANGE = 0x100;
flower.DisplayObjectFlag.COMPONENT_POSITION = 0x200;
flower.DisplayObjectFlag.DATA_GROUP_CHANGE = 0x400;

