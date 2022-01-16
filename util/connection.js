const mysql = require('mysql');


const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'pass',
        database : 'schoolDb'
      });
      
        connection.connect((error)=> {
          if(error){
            return console.log(error.message);
          }
          console.log('connected successfully to Db!');
      })
    
     

module.exports = connection
       





