
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var db = require('./models');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: '/tmp'
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


require('./routes/route-controller')(app);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


db
    .sequelize
    .sync()
    .complete(function(err) {
        if (err) {
            throw err[0]
        } else {
            http.createServer(app).listen(app.get('port'), function(){
                console.log('Express server listening on port ' + app.get('port'))
            })
        }
    });

