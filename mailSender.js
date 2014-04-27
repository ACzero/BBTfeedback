//mailSender
var nodemailer = require("nodemailer");
function sendMail(title,feedback)
{
	var status;
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "163",
	    auth: {
	        user: "282493754@163.com",
	        pass: "199312345"
	    },
	    host: "smtp.163.com",
	    port: "25"
	});

	var mailOptions = {
	    from: "282493754@163.com", // sender address
	    to: "bbtbusfeedback@gmail.com", // list of receivers
	    subject: title, // Subject line
	    text: feedback, // plaintext body
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }
	    else{
	        console.log("Message sent: " + response.message);
	    }
	});
}

exports.sendMail = sendMail;