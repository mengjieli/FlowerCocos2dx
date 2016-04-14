require("./com/requirecom");
require("./net/requirenet.js");

var file = new File("./user.json");
var content = file.readContent();
var userInfo = JSON.parse(content);
file = new File("./centerServer.json");
content = file.readContent();
var serverInfo = JSON.parse(content);


var srcEnd = ["js"];
var resEnd = ["json", "xml", "csv", "txt", "html", "plist"];

var fs = require("fs"),
    path = require("path");

/**
 * 文件信息
 * @constructor
 */

var direction = "./../"
var serverIp = serverInfo.ip;
var serverPort = serverInfo.port;
var user = userInfo.name;
var password = userInfo.password;
//更新次数
var updateTime = 100000000;
var updateType = 1;
var firstCheck = true;

var FileClient = (function (_super) {

    __extends(LocalClient, _super);

    function LocalClient() {
        _super.call(this);
    }

    var d = __define, c = LocalClient;
    var p = c.prototype;

    p.receiveData = function (message) {
        if (message.type == "binary") {
            var data = message.binaryData;
            var bytes = new VByteArray();
            bytes.readFromArray(data);
            var cmd = bytes.readUIntV();
            //console.log("[receive] cmd = ", cmd);
            switch (cmd) {
                case 0:
                    var cmd = bytes.readUIntV();
                    var code = bytes.readUIntV();
                    //console.log(cmd,code);
                    if (code != 0) {
                        this.print("Error", "ErrorCode : " + code);
                    }
                    if (cmd == 1 && code) {
                        this.print("Error", "File client login fail.");
                        this.close();
                    } else {
                        this.success(cmd);
                    }
                    break;
                case 9:
                    break;
            }
        }
    }

    p.onConnect = function (connection) {
        _super.prototype.onConnect.call(this, connection);

        var bytes = new VByteArray();
        bytes.writeUIntV(1);
        bytes.writeUTFV("LocalUpdate");
        bytes.writeUTFV(userInfo.name);
        bytes.writeUTFV(userInfo.password);
        this.sendData(bytes);

        this.checkChangeFiles();

        var _this = this;
        setTimeout(function () {
            var bytes = new VByteArray();
            bytes.writeByte(0);
            bytes.writeByte(0);
            bytes.writeByte(0);
            bytes.writeByte(0);
            _this.sendData(bytes);
        }, 10000);
    }

    p.success = function (cmd) {
        if (cmd == 1) {
            console.log("login complete");
            //登录成功
        }
    }

    p.checkChangeFiles = function () {
        var list = checkDirection();
        //console.log("Change file:",list.length);
        if(list.length) {
            var msg = new VByteArray();
            msg.writeUIntV(20);
            msg.writeUTFV(userInfo.name);
            msg.writeUTFV("Cocos2dxGame");
            msg.writeUIntV(3005);
            msg.writeUIntV(list.length);
            for (var i = 0; i < list.length; i++) {
                msg.writeUTFV(list[i].url);
                msg.writeUTFV(list[i].content);
            }
            this.sendData(msg);
        }
        setTimeout(function(){
            this.checkChangeFiles();
        }.bind(this),0);
    }

    p.sendData = function (bytes) {
        this.connection.sendBytes(new Buffer(bytes.data));
    }

    p.close = function () {
        this.connection.close();
    }

    p.onClose = function () {
        _super.prototype.onClose.call(this);
    }

    p.print = function (type, msg) {
        var cfg = {
            "type": type,
            "msg": msg
        }
        console.log(JSON.stringify(cfg))
    }

    return LocalClient;

})(WebScoektClient);


/**
 * 链接服务器
 */


var saveVersionFile = function () {
    var content = JSON.stringify(localFileList);
    versionFile.save(content);
}

var getVersionFileContent = function () {
    return JSON.stringify(localFileList);
}

var localFileList;
var versionFile = new File(direction + "version.json");
if (versionFile.isExist()) {
    try {
        localFileList = JSON.parse(versionFile.readContent());
        if (!localFileList.length) {
            localFileList = [];
        }
    } catch (e) {
        localFileList = [];
        saveVersionFile();
    }
} else {
    localFileList = [];
    saveVersionFile();
}


var server = new FileClient();
server.connect(serverIp, serverPort);

//var updateList;

/**
 * 检查并与服务器同步文件信息
 */
var checkDirection = function () {
    //updateList = [];
    //console.log("\n", "start check direction");
    var list = [];
    var file;
    if (updateType == 1 || updateType == 2) {
        file = new File(direction + "src/");
        //console.log(file.url,file.isExist());
        fileList = file.readFilesWidthEnd(srcEnd);
        list = list.concat(fileList);
    }
    if (updateType == 1 || updateType == 3) {
        file = new File(direction + "res/");
        fileList = file.readFilesWidthEnd(resEnd);
        list = list.concat(fileList);
    }
    //console.log("localFileList",localFileList.length,list.length);
    var vfile;
    var changeFileCount = 0;
    var changeFiles = [];
    for (var i = 0; i < localFileList.length; i++) {
        localFileList[i].flag = 0;
    }
    for (var i = 0; i < list.length; i++) {
        file = list[i];
        var url = file.url;
        if (url == versionFile.url) {
            continue;
        }
        url = url.slice(direction.length, url.length);
        vfile = null;
        for (var f = 0; f < localFileList.length; f++) {
            if (localFileList[f].url == url) {
                vfile = localFileList[f];
                localFileList[f].flag = 1;
                break;
            }
        }
        if (!vfile) {
            vfile = {
                "url": url,
                "modifyTime": 0,
                "createTime": 0,
                "md5": ""
            }
            localFileList.push(vfile);
        }
        if (vfile.modifyTime != file.modifyTime || vfile.createTime != file.createTime) {
            var fileContent = file.readContent("binary", "Buffer");
            var compare = md5(fileContent);
            if (vfile.md5 != compare) {
                vfile.md5 = compare;
                changeFileCount++;
                changeFiles.push(
                    {
                        url: url,
                        content: file.readContent()
                    }
                )
            } else {
            }
            vfile.createTime = file.createTime;
            vfile.modifyTime = file.modifyTime;
        }
    }
    for (var i = 0; i < localFileList.length; i++) {
        if (localFileList[i].flag == 0) {
            changeFileCount++;
            localFileList.splice(i, 1);
            i--;
        } else {
            delete localFileList[i].flag;
        }
    }
    if (changeFileCount) {
        console.log("File change :", changeFileCount);
    }
    saveVersionFile();
    return changeFiles;
}