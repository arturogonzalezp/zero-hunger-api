const express = require('express');
const app = express();
const port = 8080;
const version = "1.0.0";
const projectName = "Zero Hunger";

app.get('/jsontest', (req, res) => {
    let arr = [];
    for(var i = 1; i <= 15; i++){
        arr.push({
            id: "test-" + (i + 1000),
            name: "Test " + i,
            imageUrl: "https://vignette.wikia.nocookie.net/frontierville/images/8/87/Pear_Tree_Big-icon.png/revision/latest?cb=20100619224756"
        });
    }
    res.send(new JsonStructure("OK",arr));
});
app.get('*', (req, res) => {
    res.send(new JsonStructure("OK",projectName + " version " + version));
});

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));

function JsonStructure(status, result) {
    this.status = status;
    this.result = result;
}