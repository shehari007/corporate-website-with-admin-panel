
// module.exports = {
//     foo:  function (parameters) {
//         var cfg = require('../config');
//         var results='dsds';
        
//         cfg.config().getConnection((err, connection) => {
//             if(err) throw err
//             console.log(`connected as id ${connection.threadId}`)
//             console.log(parameters)
//             let product = parameters
            
//               let sql = "INSERT INTO categories SET ?";
              
//               let query1= connection.query ( sql, product, (err, result) => {
//                 if(err) {
//                   throw err;
//                 }else{
//                   console.log(result)
//                 results = result.protocol41
//                 }
//               });
//            })
//            return results
//     }

//   };


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
          let sql = `INSERT INTO category SET name= '${parameters.name}', status= '${parameters.status}'`;
          connection.query(sql, function(err, result){
              if(err){
                  console.log(`FAILED: ${err}`)
                  reject(err);
              }
              else
              {
                  console.log('Added successfully');
                  resolve(result.protocol41);
              }
          });
        }
        }) 
    }
  )}
  }