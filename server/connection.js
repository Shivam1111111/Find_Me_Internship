const mysql = require("mysql");

// var db_config = {
//       host: 'remotemysql.com',
//       user: '8KeiSEevAU',
//       password: 'xqKySDOYi1',
//       database: '8KeiSEevAU',
//       port : 3306
//   };
  
//   var connection;
  
//   function handleDisconnect() {
//     connection = mysql.createConnection(db_config); // Recreate the connection, since
//                                                     // the old one cannot be reused.
  
//     connection.connect(function(err) {              // The server is either down
//       if(err) {                                     // or restarting (takes a while sometimes).
//         console.log('error when connecting to db:', err);
//         setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//       } 
//       console.log('Connected Successfuly')                                    // to avoid a hot loop, and to allow our node script to
//     });                                     // process asynchronous requests in the meantime.
//                                             // If you're also serving http, display a 503 error.
//     connection.on('error', function(err) {
//       console.log('db error', err);
//       if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//         handleDisconnect();                         // lost due to either server restart, or a
//       } else {                                      // connnection idle timeout (the wait_timeout
//         throw err;                                  // server variable configures this)
//       }
//     });
//   }
  
//   handleDisconnect();

const con = mysql.createConnection({
    host: 'remotemysql.com',
    user: '8KeiSEevAU',
    password: 'xqKySDOYi1',
    database: '8KeiSEevAU',
    port : 3306
})

con.connect((err)=>{
    if(err){ 
        if(err.sta)
        console.warn("Error in Connection");
        console.log(err);
    }
    else{
        console.warn("SuccessFull Connection");
    }
})

module.exports = con;
// module.exports = db_config;