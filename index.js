const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const dotenv = require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEME
});

const port = process.env.PORT || 8080;
const version = "1.0.0";
const projectName = "Zero Hunger";

app.use(express.static('app'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: "5mb"
}));
app.use(bodyParser.json({
    limit: "5mb"
}));

app.get('/get/jsontest', (req, res) => {
    let arr = [];
    for (var i = 1; i <= 15; i++) {
        arr.push({
            id: "test-" + (i + 1000),
            name: "Test " + i,
            imageUrl: "https://vignette.wikia.nocookie.net/frontierville/images/8/87/Pear_Tree_Big-icon.png/revision/latest?cb=20100619224756"
        });
    }
    res.send(new JsonStructure("OK", arr));
});
app.get('/get/tutorials', (req, res) => {
    connection.query("SELECT * FROM tutorial", function (error, results, fields) {
        if (error) {
            res.send(new JsonStructure("ERROR", {
                message: "Everything is in caos, call the system admin"
            }));
        } else {
            res.send(new JsonStructure("OK", results));
        }
    });
});
app.post('/post/tutorial', (req, res) => {
    var params = req.body;
    connection.query("INSERT INTO tutorial (id,title,content) VALUES ('" + params.id + "', '" + params.title + "', '" + params.content + "')", function (error, results, fields) {
        if (error) {
            res.send(new JsonStructure("ERROR", {
                message: "The app is already registered"
            }));
        } else {
            res.send(new JsonStructure("OK", {
                message: "Everything is cool"
            }));
        }
    });
});
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/app/index.html');
});

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));

function JsonStructure(status, result) {
    this.status = status;
    this.result = result;
}