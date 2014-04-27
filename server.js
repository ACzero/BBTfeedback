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
app.listen(3000);