module flower {
    export class ImagePlugin {

        private static plugins:Array<flower.IImagePlugin> = [];
        private static pluginsName:Array<string> = [];

        public static registerPlugin = function (name:string, plugin:flower.IImagePlugin) {
            ImagePlugin.pluginsName.push(name);
            ImagePlugin.plugins.push(plugin);
        }

        public static getPlugin(name:string):flower.IImagePlugin {
            var plugin:IImagePlugin;
            for (var i = 0; i < ImagePlugin.pluginsName.length; i++) {
                if (ImagePlugin.pluginsName[i] == name) {
                    plugin = ImagePlugin.plugins[i];
                    break;
                }
            }
            return plugin;
        }
    }
}