var requirejs = require('requirejs');

requirejs.config({
    // Fallback for CommonJS modules
    nodeRequire: require
});

requirejs(['express','jade','console'], function(express, jade, console) {
    // Create and configure application
    var app = express();
    app.use(express.static('./static'));
    app.engine('jade', jade.__express);
    app.set('view engine', 'jade');

    // Routes
    app.get('/', function(req, res) {
        res.render('index');
    });
    app.get('/design/', function(req, res) {
        res.render('design');
    });
    app.get('/api-ref/', function(req, res) {
        res.render('api-ref');
    });

    app.get('/s/:name?', function(req, res) {
        var name = req.params.name;
        if (name === undefined) {
            res.render('list_surveys');
        } else {
            res.render('do_survey', {
                'survey': { 'name': name },
            });
        }
    });

    // Run
    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });
});
