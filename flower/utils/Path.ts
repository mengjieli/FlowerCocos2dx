module flower {
    export class Path {
        public static getFileEnd(url:string):string {
            var end = url.split("?")[0];
            end = end.split("/")[end.split("/").length - 1];
            if (end.split(".").length == 1) {
                return "";
            }
            return end.split(".")[end.split(".").length - 1];
        }
    }
}