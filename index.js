var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 5000));

//to serve the js and css files
app.use(express.static(__dirname +'/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (request, response) {
	response.render('index', {title: 'Physics sim'});
});

app.listen(app.get('port'), function () {
	console.log('app listening on port', app.get('port'));
});