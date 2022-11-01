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
          let sql = `UPDATE userInfo SET title='${parameters.title}', bio='${parameters.bio}', number='${parameters.number}', location='${parameters.location}', social_fb='${parameters.fb}', social_inst='${parameters.inst}', social_twit='${parameters.twit}' WHERE username = '${parameters.username}'`;
          connection.query(sql, function(err, rows){
              if(err){
                  console.log(`FAILED: ${err}`)
                  reject(err);
              }
              else
              {
                  console.log(rows);
                  console.log(parameters.username)
                  resolve (rows.protocol41);
              }
          });
        }
        }) 
    }
  )}
}