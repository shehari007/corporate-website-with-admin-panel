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
          let sql = ` SELECT COUNT(id) FROM userInfo WHERE email = '${parameters.email}'`;
          connection.query(sql, function(err, rows){
              if(err){
                  console.log(`FAILED: ${err}`)
                  reject(err);
              }
              else
              {
                  //console.log('Product Deleted Successfully');
                  console.log(rows);
                  resolve (rows);
              }
          });
        }
        }) 
    }
  )}
}