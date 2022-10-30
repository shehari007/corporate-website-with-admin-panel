module.exports = {
  
    foo:  function () {
      return new Promise(function(resolve,reject){
        var cfg = require('../config');
        cfg.config().getConnection((err, connection) => {
          if(err){
            console.log(err)
            reject(err);
          }
          else{
          let sql = `SELECT * FROM products ORDER BY id DESC`;
          connection.query(sql, function(err, rows){
              if(err){
                  console.log(`FAILED: ${err}`)
                  reject(err);
              }
              else
              {
                  console.log('Product Deleted Successfully');
                  resolve (rows);
              }
          });
        }
        }) 
    }
  )}
}