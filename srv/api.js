define('api', ['express', 'db'], function(express, db) {
    var app = express();

    app.get('/', function(req, res) {
        res.json({success:true});
    });

    // Handle anything that doesn't hit a route
    app.use(function(req, res) {
        res.json(404, {error:'Resource not found'});
    });

    return app;

});
