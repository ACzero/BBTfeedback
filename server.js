var successCode = 42;
var errorCode = 23;
var rejectCode = 67;

var mailSender = require('./mailSender');

var reqHelperModule = require('./reqHelper');
var reqHelper = new reqHelperModule();

var express = require('express');
var app = express();
app.use(require('connect').bodyParser());

app.post("/feedback",function(req,res){
	var platform = req.body.platform;
	var body = req.body.body;
	var version = req.body.version;
	console.log(platform + body + version);

	if(!reqHelper.isTokenCorrect(req.body.token))
	{
		res.send(rejectCode);
		return;
	}
	if(reqHelper.isReqCorrect(platform,body,version))
	{
		var title = reqHelper.makeTitle(platform,version);
		var text = reqHelper.makeText(body,req.body.contacts);
		console.log(title + '    ' + text);
		//mailSender.sendMail(title,text);
		res.send(successCode);
	}
	res.send(errorCode);                                
});                                                     
app.listen(3000);