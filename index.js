var express = require('express');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//to serve the js and css files
app.use(express.static(__dirname +'/public'));

app.get('*', (req, res) => {                       
    res.sendFile(path.resolve(__dirname, './public/js', 'index.html'));                               
});

app.listen(app.get('port'), function () {
	console.log('app listening on port', app.get('port'));
});