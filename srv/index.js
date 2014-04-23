var requirejs = require('requirejs');

requirejs.config({
    // Fallback for CommonJS modules
    nodeRequire: require
});

requirejs(['express','jade','console'], function(express, jade, console) {
    var app = express();
    app.use(express.static('./static'));
    app.engine('jade', jade.__express);
    app.set('view engine', 'jade');

    app.get('/s/:name?', function(req, res) {
        var name = req.params.name;
        if (name === undefined) {
            res.render('list_surveys');
        } else {
            res.send('<h2>' + name + '</h2>');
        }
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });
});
