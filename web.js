/**
 * Created by Cris on 24.06.2017.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/web'));
app.listen(process.env.PORT || 3000);