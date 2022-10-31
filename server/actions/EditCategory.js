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
          let sql = `UPDATE category SET name= '${parameters.name}', status= '${parameters.status}' WHERE id = '${parameters.id}'`;
          connection.query(sql, function(err, result){
              if(err){
                  console.log(`FAILED: ${err}`)
                  reject(err);
              }
              else
              {
                  console.log('UPDATED successfully');
                  resolve(result.protocol41);
              }
          });
        }
        }) 
    }
  )}
  }