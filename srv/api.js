define('api', ['express', 'db'], function(express, db) {
    var app = express();

    // Routes
    app.get('/', function(req, res) {
        res.json({success:true});
    });
    app.route('/resp/:survey/:response/')
        .get(function(req, res) {
            res.json(req.params)
        })
        .post(function(req, res) {
            res.json(req.params)
        })

    // Handle anything that doesn't hit a route
    app.use(function(req, res) {
        res.json(404, {error:'Resource not found'});
    });

    return app;

});
