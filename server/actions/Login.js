module.exports = {
  
    foo:  function (parameters) {
      return new Promise(function(resolve,reject){
        var cfg = require('../config');
        cfg.config().getConnection((err, connection) => {
          if(err){
            console.log(err)
            reject(err);
          }
          else{
          let sql = `SELECT * FROM userInfo WHERE email= '${parameters.email}' AND password='${parameters.password}'`;
          connection.query(sql, function(err, rows){
              if(err){
                  console.log(`FAILED: ${err}`)
                  reject(err);
              }
              else
              {
                  console.log(rows);
                  resolve (rows);
              }
          });
        }
        }) 
    }
  )}
}