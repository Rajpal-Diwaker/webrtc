'use strict';

let dbConfig = require("../Utilities/dbConfig");
let moment = require('moment');

let updateSocket = (dataToSet, data, callback) => 
{
    let sender_id   = `'${dataToSet.s_id}'`;
    let conditions = `user_id = '${dataToSet.s_id}'`;
    let setData = "";
    setData += `socket_id = '${data.socketId}'`;
    setData += ", `online_status` ";
    setData += ` = 'online'`;
    // console.log(`UPDATE tbl_user SET ${setData} where  ${conditions}`);
    dbConfig.getDB().query(`UPDATE tbl_user SET ${setData} where  ${conditions}`, callback);
}

let updateReadStatus = (dataSet, callback) => 
{
    // console.log(`UPDATE tbl_personal_chat SET read_status = 'Y' where from_user_id =  '${dataSet.r_id}' AND to_user_id = '${dataSet.s_id}'`)
   dbConfig.getDB().query(`UPDATE tbl_personal_chat SET read_status = 'Y' where from_user_id =  '${dataSet.r_id}' AND to_user_id = '${dataSet.s_id}'`, callback);
}

// let onlineList = (data,callback) => 
// {
//     console.log(`SELECT user_id FROM tbl_user WHERE deleted='N' and socket_id!='' and socket_id!='${data.socketId}'`);
//    dbConfig.getDB().query(`SELECT user_id FROM tbl_user WHERE deleted='N' and socket_id!='' and socket_id!='${data.socketId}'`, callback);
// }


let onlineList = (callback) => 
{
    console.log(`SELECT user_id FROM tbl_user WHERE deleted='N' and socket_id!=''`);
   dbConfig.getDB().query(`SELECT user_id FROM tbl_user WHERE deleted='N' and socket_id!=''`, callback);
}
  
let getUserChatList = (callback) => 
{
   // console.log("SELECT * FROM tbl_personal_chat WHERE ((from_user_id = " + dataSet.s_id + " AND to_user_id = " + dataSet.r_id +") or (to_user_id = " + dataSet.s_id + " AND from_user_id = " + dataSet.r_id +")) ORDER BY chat_id DESC");
    dbConfig.getDB().query("SELECT * FROM tbl_personal_chat WHERE deleted='N' and ((from_user_id = " + dataSet.s_id + " AND to_user_id = " + dataSet.r_id +") or (to_user_id = " + dataSet.s_id + " AND from_user_id = " + dataSet.r_id +")) ORDER BY chat_id ASC ", callback);
}

let deleteChat = (dataSet, callback) => 
{
    dbConfig.getDB().query(`UPDATE tb_chat SET delete_for_everyone = '1' where id = ${dataSet.msg_id}`, callback);
}

let sendChatMessage = (dataSet, callback) => 
{ 

    // console.log("Request Data ===",dataSet) 
       
    var dateTime = NOW();    
    let sender_id   = `'${dataSet.s_id}'`;
    let receiver_id = `'${dataSet.r_id}'`;
    let message     = `'${dataSet.msg}'`;
    let file        = `'${dataSet.files}'`;
    let type        = `'${dataSet.type}'`;

     if (!dataSet.files)
     {
        if ((type=='undefined')||(type)) 
        {
            console.log(`INSERT INTO tbl_personal_chat (from_user_id,to_user_id,message) 
        values(${sender_id},${receiver_id},${message})`);

            dbConfig.getDB().query(`INSERT INTO tbl_personal_chat (from_user_id,to_user_id,message) 
            values(${sender_id},${receiver_id},${message})`, callback); 

        }
        else
        {
         console.log(`INSERT INTO tbl_personal_chat (from_user_id,to_user_id,message,type) 
        values(${sender_id},${receiver_id},${message},${type})`);
        
        dbConfig.getDB().query(`INSERT INTO tbl_personal_chat (from_user_id,to_user_id,message,type) 
        values(${sender_id},${receiver_id},${message},${type})`, callback);                     

        }
     }
     else
     {
        console.log(`INSERT INTO tbl_personal_chat (from_user_id,to_user_id,message,files,type) 
        values(${sender_id},${receiver_id},${message},${file},${type})`);   

        dbConfig.getDB().query(`INSERT INTO tbl_personal_chat (from_user_id,to_user_id,message,files,type) 
        values(${sender_id},${receiver_id},${message},${file},${type})`, callback); 
     }
}

let getuserName = (dbUserDataSet, callback) => {
    // dbConfig.getDB().query("SELECT first_name,last_name from users WHERE user_id=" + dbUserDataSet.user_id, callback);
}

let getUserImage = (dbUserImageSet, callback) => {
    // dbConfig.getDB().query("SELECT profile_picture from users WHERE user_id=" + dbUserImageSet.user_id, callback);
}


let getSocketId = (id, callback) => 
{
    // console.log("SELECT socket_id,online_status from tbl_user WHERE user_id=" + id);
  dbConfig.getDB().query("SELECT socket_id,online_status,user_id from tbl_user WHERE user_id=" + id, callback);  
}



let updateVideoStatus = (socketId1,socketId2, callback) => {

    dbConfig.getDB().query("UPDATE `users` SET `r_id`='',`chat_type`='' WHERE socketId='" + socketId1 +"' OR `socketId`='"+socketId2+"'", callback);

}


let updateChatStatus = (dataSet, callback) => 
{
    //      var socketId=dataSet[0].socketId;
    // dbConfig.getDB().query("delete from `tbl_user` SET WHERE socket_id='" + socketId+"'", callback);
}


let deleteMsg = (data,id, callback) => 
{
  
  console.log('----->query',"UPDATE `tb_chat` SET `delete_for_everyone` = '" + data.getcheckmsg.delete_for_everyone+"',`deleted_by` = '" + data.getcheckmsg.deleted_by+"' WHERE id='" + id+"'");
    dbConfig.getDB().query("UPDATE `tb_chat` SET `delete_for_everyone` = '" + data.getcheckmsg.delete_for_everyone+"',`deleted_by` = '" + data.getcheckmsg.deleted_by+"' WHERE id='" + id+"'", callback);
}



let msgData = (data, callback) => {

    dbConfig.getDB().query("SELECT *FROM `tb_chat` WHERE `id` = '1' AND `deleted_by`!=" + data.user_id, callback);

}


let checkForBadgeCount = (dbBadgeCountData, callback) => {
    let conditions = '';
    dbBadgeCountData.user_id ? conditions += ` user_id = '${dbBadgeCountData.user_id}'` : true;
    dbBadgeCountData.sender_id ? conditions += ` and sender_id = '${dbBadgeCountData.sender_id}'` : true;
    dbBadgeCountData.type ? conditions += ` and type = '${dbBadgeCountData.type}'` : true;
    dbConfig.getDB().query(`SELECT * FROM badgecount WHERE ${conditions}`, callback);
}

let insertBatchCount = (dbBadgeCountinsertData, callback) => {
    dbConfig.getDB().query("insert into badgecount set ? ", dbBadgeCountinsertData, callback);
    return dbBadgeCountinsertData;
}

let getCount = (countData, callback) => {
    let conditions = '';
    countData.user_id ? conditions += ` user_id = '${countData.user_id}'` : true;
    dbConfig.getDB().query(`SELECT SUM(IF(type='chat',1,0)) as chat_count,SUM(IF(type='matches',1,0)) as match_count FROM badgecount WHERE ${conditions}`, callback);
}

let oflineUser = (data, callback) => 
{

    let conditions = `socket_id = '${data}'`;
    let setData = "";
    setData += `online_status = 'offline'`;
    setData += ", `socket_id` ";
    setData += `=''`;
    console.log(`UPDATE tbl_user SET ${setData} where  ${conditions}`);
    dbConfig.getDB().query(`UPDATE tbl_user SET ${setData} where  ${conditions}`, callback);
}


function NOW() 
{

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

module.exports = {
    updateSocket: updateSocket,
    updateReadStatus: updateReadStatus,
    getUserChatList: getUserChatList,
    sendChatMessage: sendChatMessage,
    getuserName: getuserName,
    getUserImage: getUserImage,
    getSocketId: getSocketId,
    checkForBadgeCount: checkForBadgeCount,
    insertBatchCount: insertBatchCount,
    getCount: getCount,
    oflineUser: oflineUser,
    deleteChat: deleteChat,
    deleteMsg: deleteMsg,
    msgData:msgData,
    updateChatStatus:updateChatStatus,
    updateVideoStatus: updateVideoStatus,
    onlineList:onlineList

}
