const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 5,
    host: "imcesar.com",
    user: "zerohungermaster",
    password: "zero1029384756",
    database: "zerohunger"
});

const port = process.env.PORT || 80;
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
    for (var i = 1; i <= 8; i++) {
        arr.push({
            id: "test-" + (i + 1000),
            name: "Test " + i,
            imageUrl: "http://www.micasarevista.com/var/decoracion/storage/images/mi-casa/terraza-jardines-porche/plantas-resistentes-al-sol/1119269-1-esl-ES/12-plantas-de-sol-para-el-verano_ampliacion.jpg"
        });
    }
    res.send(new JsonStructure("OK", arr));
});
app.get('/get/tutorials', (req, res) => {
    connection.query("SELECT * FROM tutorial ORDER BY db_id", function (error, results, fields) {
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
    console.log("Post tutorial");
    var params = req.body;
    connection.query("INSERT INTO tutorial SET ?", params, function (error, results, fields) {
        if (error) {
            throw error;
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