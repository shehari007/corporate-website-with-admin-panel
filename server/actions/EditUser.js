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
          let sql = `UPDATE userInfo SET firstname= '${parameters.firstname}', lastname= '${parameters.lastname}', username = '${parameters.username}', email= '${parameters.email}', password= '${parameters.password}', accesslvl= '${parameters.accesslvl}' WHERE id = '${parameters.id}'`;
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