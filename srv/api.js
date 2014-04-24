define('api', ['express','body-parser','db'], function(express, bp, db) {
    var app = express();
    app.use(bp());

    // Routes
    app.get('/', function(req, res) {
        res.json({success:true});
    });
    app.route('/resp/:survey/:response/')
        .get(function(req, res) {
            var sql = 'SELECT value FROM response WHERE '
                +'survey_name = $survey '
                +'AND response_name = $response;';
            var params = {
                $survey: req.params.survey,
                $response: req.params.response
            };
            db.get(sql, params, function(err, row) {
                if (err !== null) {
                    console.error(err);
                    res.json(500, { error: err });
                }
                if (row === undefined) {
                    // No data, but not an error. Client side will legitimately
                    // interpret both err and value to be undefined.
                    res.json({});
                } else {
                    // Requires a bit of unpacking
                    res.json({value: row.value});
                }
            });
        })
        .post(function(req, res) {
            var sql = 'INSERT OR REPLACE INTO response '
                +'(survey_name, response_name, value) '
                +'VALUES($survey, $response, $value)';
            var params = {
                $survey: req.params.survey,
                $response: req.params.response,
                $value: req.body.value
            };
            db.run(sql, params, function(err) {
                if (err === null) {
                    res.json({success: true, value: params.$value})
                } else {
                    console.error(err)
                    res.json({success: false, error: err})
                }
            });
        })

    // Handle anything that doesn't hit a route
    app.use(function(req, res) {
        res.json(404, {error:'Resource not found'});
    });

    return app;

});
