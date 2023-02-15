const FCM = require('fcm-push'),
dbConfig = require("../Utilities/dbConfig"),
serverKey = require('./config').config.fcmServerKey.key,
schedule = require('node-schedule');


module.exports = {

"android_notification": function (deviceToken,title, msg, type,pushData,r_id,s_id) {

	// console.log("-========================------------->",pushData)
    var dateTime = NOW();
	var fcm = new FCM(serverKey);
	
	var chatData=
	{
	"r_id":s_id,
	"ImageUrl":JSON.parse(JSON.stringify(pushData.ImageUrl)),
	"first_name":pushData.first_name,
	"last_name":pushData.last_name,
	"dateTime":dateTime
	};


var message = {
registration_ids: [deviceToken],
// "data": { "title": title, "type": type, "msg": msg,"chatData":chatData,"videochatData":videochatData },
"data": { "title": title, "type": type, "msg": msg,"chatData":chatData,"sound": "default"},
"sound": "default",
	"priority": "high"
};

// console.log("Android_NOTIFICATION message===>", message);
fcm.send(message, function (err, response) {
// console.log("notification main error--------->",err,response)
if (err) {
// console.log("Something has gone wrong!");

// console.log("errror" + err);
} else {
// console.log("Successfully sent with response: " + response);
}
});


},

// !IOS_NOTIFICATION
"IOS_NOTIFICATION": function (deviceToken, title, msg, type,pushData,r_id,s_id) 
{

// console.log('IOS_NOTIFICATION----------------------->')

// console.log("module calledIOS")

// console.log("title====>", title)
var fcm = new FCM(serverKey);

    var dateTime = NOW();

	var chatData=
	{
	"r_id":s_id,
	"first_name":pushData.first_name,
	"last_name":pushData.last_name,
	"ImageUrl":pushData.ImageUrl,
	"dateTime":dateTime
	}

var message =
	{
	"registration_ids": [deviceToken],
	"notification": { "title": title, "body": msg,"type": type,"chatData":chatData,"sound": "default"},
	"sound": "default",
	"priority": "high"
	};

// console.log("IOS_NOTIFICATION message===>", message);
fcm.send(message, function (err, response) {
if (err) 
{

// console.log(err,"Something has gone wrong!");

console.log("errror" + err);

} else {

// console.log("Successfully sent with response: " + response);
}
});


},


// SENDER_DATA
// "SENDER_DATA": async function (notiType,device_id,web_id, device_type, title, msg,pushData,acc_type,r_id,s_id) {
"SENDER_DATA": async function (notiType,device_id,device_type, title, msg,pushData,r_id,s_id) 
{

	// console.log('acc_type------------>',acc_type);


		if (device_type == '0') 
		{
		// IOS Notification send
			// console.log("IOS notification send",device_id)
			this.IOS_NOTIFICATION(device_id,title,msg,notiType,pushData,r_id,s_id)
		}
		if (device_type == '1') 
		{
			// console.log("android notification send",device_id)
		  // android Notification send
			this.android_notification(device_id,title, msg,notiType,pushData,r_id,s_id)
		}

	}
}






function NOW() {

    var date = new Date();
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = aaaa + "-" + mm + "-" + gg;

    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;

}
















