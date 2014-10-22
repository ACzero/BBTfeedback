var fs = require('fs');
var reqHelperModule = require('./reqHelper');
var reqHelper = new reqHelperModule();

var express = require('express');
var app = express();
app.use(require('connect').bodyParser());

app.post("/feedback",function(req,res){
	var platform = req.body.platform;
	var body = req.body.body;
	var version = req.body.version;
	var apiVersion = req.body.apiVersion;
	var contacts = req.body.contacts;
	res.set('Content-Type', 'application/json');

	var resMessage;
	switch(apiVersion)
	{
		case "0.1":
			resMessage = reqHelper.api_v1(platform,body,version,apiVersion,contacts);
			break;
		default:
			resMessage = reqHelper.toJson(10,"apiVersion is invalid");
	}
	res.send(resMessage);	                                
});

app.get("/notice",function(req,res){	
	res.set('Content-Type', 'application/json');
	//var fileName = "notice.txt";
	var platform = req.param('platform');
	var text = "校巴正常运行中.
	WindowsPhone消息:2.3版本已发布,加入2D地图功能,没有更新推送的用户请到应用商店重新下载(新版本已经把2.5D地图数据分离,可以在应用内下载或者从SD卡导入,因此新版本大小只有2mb)";
	if(platform == "wp")
	{
		fileName = 'wp.txt';
		text = "校巴正常运行中.";
	}

	// fs.readFile(fileName,function(err,content)
	// {
	// 	if(err)
	// 	{
	// 		throw err;
	// 	}
	// 	//var text = content.toString();
	// 	var text = "中文";
	// 	var jArray = {'notice' : text};
	// 	var resMessage = JSON.stringify(jArray)
	// 	resMessage = resMessage.replace(/\s/,"");
	// 	res.send(resMessage);
	// });
	var jArray = {'notice' : text};
	var resMessage = JSON.stringify(jArray)
	resMessage = resMessage.replace(/\s/,"");
	res.send(resMessage);
});
                                                     
app.listen(3000);