//env TZ='Asia/Calcutta';

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const notify=require("./Utilities/pushNotification");
const app = express();
const userDAO = require('./DAO/chatDAO');
//const user = require('./DAO/userDAO')
const moment = require('moment');
const https = require('https');
const config = require("./Utilities/config").config;
const  async =require('async');
let dbConfig = require("./Utilities/dbConfig");
var ffmpeg = require('ffmpeg');
var cred = require('./Utilities/cred');


app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
});


// var options={
//     key: fs.readFileSync("/home/ec2-user/newssl/sterkla.key"),
//     cert: fs.readFileSync("/home/ec2-user/newssl/4d18d3ac04175cf2.crt"),
//     ca: fs.readFileSync("/home/ec2-user/newssl/gd_bundle-g2-g1.crt"),
// }

var server = require('http').Server(app);
const io = require('socket.io')(server);

// server = require('https').Server(options, app)
// server.listen(app.get('port'), function () {
// });


server.listen(config.NODE_SERVER_PORT.port, function () 
{
  console.log("Server now connected on port.", config.NODE_SERVER_PORT.port);
});

var agent = new https.Agent({
  keepAlive: true,
  maxSockets: 2,
  keepAliveMsecs: 3000
})


io.on('connection', function (socket) {
  io.clients((error, clients) => {
    if (error) throw error;
    console.log(clients);
  })

  socket.on('initChat', async function (data) 
  {       
    userDAO.updateSocket(data, { socketId: socket.id }, 
      (err, dbData) => 
      {
      if (err) 
      {
        console.log(err);
      }
    });

    userDAO.onlineList((err,dbData) => {
      console.log('total online user',dbData);
      // io.sockets.to(socket.id).emit('receiveMessage',{"result": dbData });
      io.sockets.emit('receiveMessage',{"result": dbData });       
     })

  });


  socket.on('sendMessage', function (data) 
  {

    var send_count = 0;
    var receive_count = 0;   
    userDAO.getSocketId(data.r_id, (err, r_socketId) => 
    {
     userDAO.sendChatMessage(data, async (err, dbData) => 
      {
        if (err) 
        {
          io.sockets.to(socket.id).emit('error_callback', { "message": "error occur." });
        }       
      var userData = await getUserDetails(data); // reciver user data
      var sendData = await senderDetails(data);  // sender user data
      var getChatData = await getChatDetails(data); // last chat data
           if(getChatData)
      {
          getChatData.forEach(x=>{
            for (let [key, value] of Object.entries(x)) 
            {
                if(value == null)
                {
                  x[`${key}`]=''
                }
             }
          })
      }   

      getChatData[0]['created_date'] = moment().format('YYYY-MM-DD H:mm:ss');
      getChatData[0]['type'] = getChatData[0]['type'];

      if (r_socketId[0]['user_id']==getChatData[0]['to_user_id']) 
      {
               
          if (r_socketId[0].socket_id == userData['socket_id'])
          {

               if (r_socketId[0].socket_id)
                {
                  io.sockets.to(r_socketId[0].socket_id).emit('receiveMessage', { "result":getChatData[0] });
                  receive_count ++

                }
        
          }
      }          
            io.sockets.emit('receiveMessage',{"result": getChatData[0] });       
      })
    })
  })


  socket.on('sendcall', function (data) 
  {
    var send_count = 0;
    var receive_count = 0;
    console.log("send call start -------------------")
    userDAO.getSocketId(data.r_id, (err, r_socketId) => 
    {   
     userDAO.sendChatMessage(data, async (err, dbData) => 
      {

        if (err) 
        {
          io.sockets.to(socket.id).emit('error_callback', { "message": "error occur." });
        }       

      var userData = await getUserDetails(data); // reciver user data
      var sendData = await senderDetails(data);  // sender user data
      var getChatData = await getChatDetails(data); // last chat data
      
      if(getChatData)
      {
          getChatData.forEach(x=>{
            for (let [key, value] of Object.entries(x)) 
            {
                if(value == null)
                {
                  x[`${key}`]=''
                }
             }
          })
      }   

      // console.log('getChatData========',getChatData)
      getChatData[0]['created_date'] = moment().format('YYYY-MM-DD H:mm:ss');
      getChatData[0]['type'] = getChatData[0]['type'];

      if (r_socketId[0]['user_id']==getChatData[0]['to_user_id']) 
      {
               
          if (r_socketId[0].socket_id == userData['socket_id'])
          {

               if (r_socketId[0].socket_id)
                {
                  console.log("recieve call---------------->111111111111")
                    io.sockets.emit('receivecall',{"result": getChatData[0] });
                }
        
          }
      }
            console.log("sen call =================>2222222222222222");            
             io.sockets.emit('receivecall',{"result": getChatData[0] });
            send_count ++
            console.log("Sendcount --->",send_count,"ReceiveCount ---->",receive_count)


      })
    })
  })

  socket.on('disconnect', function () {

    console.log("disconnect==>>", socket.id)
    console.log("==>>==>>==>>==>>==>>==>>disconnect==>>")

    userDAO.oflineUser(socket.id, (err, dbData) => {
      if (err) {
        console.log(err);
      }
    })

    userDAO.onlineList((err,dbData) => {
      console.log("==>>==>>==>>==>>==>>==>>disconnect==>>", dbData)
      io.sockets.emit('receiveMessage',{"result": dbData });
     })

  });

  });



async function getUserDetails(data) {
  return new Promise((resolve, reject) => 
  {
    let query = 'SELECT * FROM `tbl_user` as `r`  WHERE `r`.`user_id`='+data.r_id
    dbConfig.getDB().query(query, (err3, dbData3) => {
      if (err3) {
        reject(err3);
      } else {
        resolve(dbData3[0])
      }
    })
  })
}


async function getchatData(data) {
  return new Promise((resolve, reject) => 
  {
    let query = "SELECT * FROM tbl_personal_chat WHERE ((from_user_id = " + data.s_id + " AND to_user_id = " + data.r_id +") or (to_user_id = " + data.s_id + " AND from_user_id = " + data.r_id +")) ORDER BY chat_id DESC ";
    dbConfig.getDB().query(query, (err3, dbData3) => 
    {
      if (err3) 
      {
        reject(err3);
      } 
      else 
      {
        resolve(dbData3)
      }

    })
    
  })
}

async function senderDetails(data) {
  return new Promise((resolve, reject) => {
    let url=cred['serverURLs']['localdev']['uploadFolder'];
    
    // let query = "SELECT r.*,(SELECT images FROM `tbl_user_image` WHERE created_by=r.user_id AND deleted='N' AND verify_pic='Y') ImageUrl FROM `tbl_user` as `r`  WHERE `r`.`user_id`=" + data.s_id
    let query = "SELECT r.*,concat('" + url + "',(SELECT images FROM `tbl_user_image` WHERE created_by=r.user_id AND deleted='N' AND verify_pic='Y')) ImageUrl FROM tbl_user as r  WHERE r.user_id='" + data.s_id +"'"

    dbConfig.getDB().query(query, (err3, dbData3) => {
      if (err3) {
        reject(err3);
      } else {
        resolve(dbData3[0])
      }
    })
  })
}


async function getChatDetails(data) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM `tbl_personal_chat` AS `r`  WHERE `r`.`from_user_id`='+data.s_id+'  ORDER BY chat_id DESC LIMIT 1'
    // console.log(query)
    dbConfig.getDB().query(query, (err3, userChatData) => {
      if (err3) {
        reject(err3);
      } else {
        resolve(userChatData)
      }
    })
    // console.log('userChatDatauserChatData=userChatData',userChatData)
  })
}

async function intUser(data) {
  return new Promise((resolve, reject) => {

     let user_id = `user_id = '${data.r_id}'`;
    let deleted_id = `deleted_id = '${data.s_id}'`;

    let query = `DELETE FROM chat_data WHERE  ${user_id} AND ${deleted_id}`

    dbConfig.getDB().query(query, (err3, dbData3) => {
      if (err3) {
        reject(err3);
      } else {
        resolve(dbData3[0])
      }
    })
  })
}
/* get socketId by userId */
var getSocketId = function (users, userId, type, callbackonline) {
    if (type == "group") {
        chatquery.seenBy({ doctor_to: userId, type: type }, (err, socketIds) => {
            if (err) {
                console.log(err);
            }
            var socketdata = [];
            var arrayIds = socketIds[0];
            for (let xuser of arrayIds.member_ids.split(',')) {
                for (let user of users) {
                    if (user.userId == xuser) {
                        socketdata.push({ userId: user.userId, socketId: user.socketId, status: user.status, windowOpen: user.windowOpen });

                    }
                }
            }
            callbackonline(socketdata);
        })
    } else {
        let socketdata;
        for (let user of users) {
            if (user.userId == userId) {
                socketdata = { userId: user.userId, socketId: user.socketId, status: user.status, windowOpen: user.windowOpen };

            }
        }
        callbackonline(socketdata);
    }
}

//
// initChat Request {"s_id":"2"}
// sendMessage Request {"s_id":"3","r_id":"2", "msg":"lest","files":"1573095501rd.png","type":"image,video,gif" }

// initChat
// sendMessage
// receiveMessage
// onlineList
//receivecall

// getChatList
// disconnectChat
// messageDelete