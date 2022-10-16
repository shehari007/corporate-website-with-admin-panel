
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const fileUpload = require('express-fileupload');
var multer = require('multer')
var forms = multer();
var cors = require('cors');




const app = express()
const port = process.env.PORT || 5000
app.use(bodyParser.json());
app.use(fileUpload());
app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'localhost:5000'] }));

app.post('/index', async (req, res) => {
    var actions = require('./actions/' + req.body.action);
    if (req.body.action === 'Register') {
        var ss = await actions.foo(req.body.parameters);
        res.send(ss);
    }
    if (req.body.action === 'Login') {
        var ss = await actions.foo(req.body.parameters);
        res.send(ss[0]);
    }
    if (!req.body.parameters) {
        var ss = await actions.foo();
        res.send(ss);
    }
    if(req.body.action !== 'Login' && req.body.action !== 'Register' && req.body.parameters) {
        var ss = await actions.foo(req.body.parameters);
        res.send(ss);
    }
})

app.post('/upload', async (req, res) => {
    console.log(req)
})




//===========================================================================================================












// function post(parameters, endPoint){


//     app.post('/'+endPoint, (req, res) => {

//         pool.getConnection((err, connection) => {
//             if(err) throw err
//             console.log(`connected as id ${connection.threadId}`)
//             let product = parameters;

//               let sql = "INSERT INTO categories SET ?";
//               let query = connection.query(sql, product, (err, result) => {
//                 if(err) throw err;
//                 return res.send(result)
//               });
//            })
//         })




// }


// app.post('/signup', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)
//         let product = {
//            name: req.body.name,
//            category: req.body.category,
//            status: req.body.status
//           };

//           let sql = "INSERT INTO categories SET ?";
//           let query = connection.query(sql, product, (err, result) => {
//             if(err) throw err;
//             return res.send('true')
//           });
// connection.query('INSERT INTO blogdata SET ?', (err, rows) => {
//     connection.release() // return the connection to pool
//     let sql = 'INSERT INTO blogdata SET ?';
//     let query= connection.query(sql,product)
//     if(!err) {
//         res.send(rows)
//     } else {
//         console.log(err)
//     }

// })
//     })
// })


// // Get a beer by ID
// app.get('/:id', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         connection.query('SELECT * from blogdata WHERE id = ?', [req.params.id], (err, rows) => {
//             connection.release() // return the connection to pool

//             if(!err) {
//                 res.send(rows)
//             } else {
//                 console.log(err)
//             }

//         })
//     })
// })

// // Delete a records 
// app.post('/delete', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)
//         let prod = {
//             id: req.body.id
//         }
//         let sql = 'DELETE FROM categories WHERE ?';
//         let query = connection.query(sql, prod, (err, result) => {
//             if(err) throw err;
//             return res.send('deleted id:'+ req.body.id);
//           });

// connection.query('DELETE from categories WHERE id = ?', [req.params.id], (err, rows) => {
//     connection.release() // return the connection to pool

//     if(!err) {
//         res.send(`Beer with the Record ID: ${[req.params.id]} has been removed.`)
//     } else {
//         console.log(err)
//     }

// })
// })
//})


// // Add a record / beer
// app.post('', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         const params = req.body

//         connection.query('INSERT INTO beers SET ?', params , (err, rows) => {
//             connection.release() // return the connection to pool

//             if(!err) {
//                 res.send(`Beer with the name: ${params.name} has been added.`)
//             } else {
//                 console.log(err)
//             }

//         })

//         console.log(req.body)
//     })
// })


// // Update a record / beer
// app.put('', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         const { id, name, tagline, description, image } = req.body

//         connection.query('UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?', [name, tagline, description, image, id] , (err, rows) => {
//             connection.release() // return the connection to pool

//             if(!err) {
//                 res.send(`Beer with the name: ${name} has been added.`)
//             } else {
//                 console.log(err)
//             }

//         })

//         console.log(req.body)
//     })
// })



// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))