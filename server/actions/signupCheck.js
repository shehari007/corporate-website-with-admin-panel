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
          let sql = ` SELECT COUNT(id) as count FROM userInfo WHERE email = '${parameters.email}'`;
          connection.query(sql, function(err, rows){
              if(err){
                  console.log(`FAILED: ${err}`)
                  reject(err);
              }
              else
              {
                  //console.log('Product Deleted Successfully');
                  console.log(typeof(rows));
                  var data = JSON.parse(JSON.stringify(rows));
                  //console.log({data[0]['count']});
                  resolve (true);
              }
          });
        }
        }) 
    }
  )}
}