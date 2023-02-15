let environment = require('./environment').environment;
let serverURLs = require("./cred").serverURLs;

let config = {
"DB_URL": {
"host": `${serverURLs[environment].MYSQL_HOST}`,
"user": `${serverURLs[environment].MYSQL_USER}`,
"password": `${serverURLs[environment].MYSQL_PASSWORD}`,
"database": `${serverURLs[environment].MYSQL_DATABASE}`
},
"fcmServerKey":{
"key":"AAAAi7f15P4:APA91bF0msnf4gUW01BhZ5HRLNimtS3YgpKICwQFFXA18OSXZ_O8upUBNiRjjws8V6capTJIZ9w8mvYqtA8nmaUmpR9vme7SDQ1_EqkROWZL3Oq35b8lk5__XJIWzYSCDFm51I-PzApC"
// "key":"AAAAi7f15P4:APA91bF0msnf4gUW01BhZ5HRLNimtS3YgpKICwQFFXA18OSXZ_O8upUBNiRjjws8V6capTJIZ9w8mvYqtA8nmaUmpR9vme7SDQ1_EqkROWZL3Oq35b8lk5__XJIWzYSCDFm51I-PzApC"
},
"EMAIL_CONFIG": {
"host": `${serverURLs[environment].EMAIL_HOST}`,
"port": `${serverURLs[environment].EMAIL_PORT}`,
"secure": `${serverURLs[environment].EMAIL_SECURE}`,
"requireTLS": `${serverURLs[environment].EMAIL_TLS}`,
"auth": {
"user": `${serverURLs[environment].EMAIL_USER}`,
"pass": `${serverURLs[environment].EMAIL_PASS}`,
}
},
"NODE_SERVER_PORT": {
"port": `${serverURLs[environment].NODE_SERVER_PORT}`
},
"NODE_SERVER_URL": {
"url": `${serverURLs[environment].NODE_SERVER}`
},
"Stripe" :{
'user': `${serverURLs.stripe_auth.user}`,
'pass': `${serverURLs.stripe_auth.pass}`
},
"webUrl": {
"web": `${serverURLs[environment].webUrl}`
}
};


module.exports = {
config: config,
};