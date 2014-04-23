define('frontend', ['express','jade'], function(express, jade) {

    // Create and configure application
    var app = express();
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

    return app;

});
