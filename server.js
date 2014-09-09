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
	var fileName = "notice.txt";
	var platform = req.params.platform;
	if(platform == "test")
	{
		fileName = 'test.txt';
	}

	fs.readFile(fileName,function(err,content)
	{
		if(err)
		{
			throw err;
		}
		var text = content.toString();
		var jArray = {'notice' : text};
		var resMessage = JSON.stringify(jArray)
		resMessage = resMessage.replace(/\s/,"");
		res.send(resMessage);
	});
});
                                                     
app.listen(3000);