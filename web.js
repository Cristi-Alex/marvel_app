/**
 * Created by Cris on 24.06.2017.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
