/**
 * Created by Cris on 24.06.2017.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});
app.listen(3000, '0.0.0.0', function(err) {
    console.log("Started listening on %s", app.url);
});
