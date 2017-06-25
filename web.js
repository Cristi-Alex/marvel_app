/**
 * Created by Cris on 24.06.2017.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});
var port_number = process.env.PORT || 3000;
app.listen(port_number, function(){
    console.log("Express server listening on port %d in %s mode", port_number, app.settings.env);
});
