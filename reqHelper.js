var successCode = 42;
var errorCode = 23;
var platformName = new Array('iOS','Andriod','WindowsPhone');

var mailSender = require('./mailSender');
/// <summary>
/// 请求的检验与处理模块
/// </summary>
function reqHelper()
{
	/// <summary>
	/// 判断请求参数是否合法
	/// </summary>
	/// <param name = 'platform'>应用平台(0=>iOS,1=>Andriod,2=>WP)</param>
	/// <param name = 'body'>反馈内容</param>
	/// <param name = 'version'>版本</param>
	this.isReqCorrect = function(platform,body,version,apiVersion)
	{
		if(body == undefined || body == "" || version == undefined || platform == undefined)
		{
			return false;
		}
		if(platform != 0 && platform != 1 && platform != 2)
		{
			return false;
		}
		return true;
	}

	/// <summary>
	/// 生成邮件标题
	/// </summary>
	/// <param name = 'platform'>应用平台(0=>iOS,1=>Andriod,2=>WP)</param>
	/// <param name = 'version'>版本</param>
	this.makeTitle = function(platform,version,apiVersion)
	{
		return platformName[platform] + '(version:' + version + ',api:'+ apiVersion + ')';
	}

	/// <summary>
	/// 生成邮件内容
	/// </summary>
	/// <param name = 'body'>反馈内容</param>
	/// <optional param name = 'contacts'>版本</param>
	this.makeText = function(body,contacts)
	{
		if(contacts != undefined)
		{
			return body + '(contacts:' + contacts + ')';
		}
		return body;
	}

	/// <summary>
	/// 把code转换成Json格式
	/// </summary>
	/// <param name = 'code'></param>
	this.toJson = function(code,message)
	{
		var jArray = {'Code':code,'message':message};
		return JSON.stringify(jArray);
	}

	///<summary>
	///接口v0.1
	///</summary>
	this.api_v1 = function(platform,body,version,apiVersion,contacts)
	{
		if(this.isReqCorrect(platform,body,version))
		{
			var title = this.makeTitle(platform,version,apiVersion);
			var text = this.makeText(body,contacts);
			mailSender.sendMail(title,text);
			return this.toJson(successCode,"success");
		}
		return this.toJson(errorCode,"param is invalid");
	}
}

module.exports = reqHelper;