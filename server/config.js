module.exports={
    config: function () {
var mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'businessInfo'
})
return pool;
    }
}