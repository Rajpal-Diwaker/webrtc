

let serverURLs = {
"localdev": {
"NODE_SERVER": "http://localhost",
"NODE_SERVER_PORT": "7676",
"MYSQL_HOST": 'localhost',
"MYSQL_USER": 'root',
"MYSQL_PASSWORD": 'Techugo@123',
'MYSQL_DATABASE': 'webrtc',
"EMAIL_USER": 'XXXXXXX',
"EMAIL_PASS": 'XXXXXXXX',
"EMAIL_HOST": 'smtp.gmail.com',
"EMAIL_PORT": "465",
"EMAIL_SECURE": true,
"EMAIL_TLS": true,
"uploadFolder":"http://r3allove.s3-ap-southeast-1.amazonaws.com/",
"defualtImageUrl":"/var/www/html/r3allove/upload/",
"usersImageUrl":"/var/www/html/r3allove/upload/",
"webUrl":'http://52.27.53.102:7676/'

},
"serverdev": {
"NODE_SERVER": "http://52.27.53.102",
"NODE_SERVER_PORT": "7676",
"MYSQL_HOST": 'localhost',
"MYSQL_USER": 'root',
"MYSQL_PASSWORD": 'Techugo@123',
'MYSQL_DATABASE': 'webrtc',
"EMAIL_USER": 'XXXXXX',
"EMAIL_PASS": 'XXXXXXXXXX',
"EMAIL_HOST": 'smtp.gmail.com',
"EMAIL_PORT": "465",
"EMAIL_SECURE": true,
"EMAIL_TLS": true,
"webUrl":'http://52.27.53.102:7676/'
},
"stripe_auth": { 
'user': 'xxxxxxxxxxx',
'pass': 'xxxxxxxx'
},

}

module.exports = {
serverURLs: serverURLs
}