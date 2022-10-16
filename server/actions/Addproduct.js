const { escape } = require('mysql');

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
            let desc = escape(`${parameters.prod_desc}`)
          let sql = `INSERT INTO products (prod_name, prod_desc, prod_cat, prod_feat) values (${connection.escape(parameters.prod_name)}, ${connection.escape(parameters.prod_desc)}, '${parameters.prod_cat}', '${parameters.prod_feat}')`;
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