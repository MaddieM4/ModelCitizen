define('api', ['express','body-parser','db'], function(express, bp, db) {
    var app = express();
    app.use(bp.json());

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
                    return res.json(500, {
                        error: 'DB error (' + err.toString() + ')'
                    });
                }
                if (row === undefined) {
                    // No data, but not an error. Client side will legitimately
                    // interpret both err and value to be undefined.
                    res.json({});
                } else {
                    try {
                        var value = JSON.parse(row.value);
                    } catch(err) {
                        console.error(err);
                        return res.json(500, {
                            error: 'Non-JSON data in DB (' + err.toString() + ')'
                        });
                    }
                    res.json({value: value});
                }
            });
        })
        .post(function(req, res) {
            var sql = 'INSERT OR REPLACE INTO response '
                +'(survey_name, response_name, respondent_name, value) '
                +'VALUES($survey, $response, $respondent, $value)';
            var params = {
                $survey: req.params.survey,
                $response: req.params.response,
                $respondent: req.params.respondent || '',
                $value: JSON.stringify(req.body.value)
            };
            db.run(sql, params, function(err) {
                if (err === null) {
                    res.json({success: true, value: req.body.value})
                } else {
                    console.error(err)
                    return res.json(500, {
                        success: false,
                        error: 'Failed to set data (' + err.toString() + ')'
                    });
                }
            });
        })

    // Handle anything that doesn't hit a route
    app.use(function(req, res) {
        res.json(404, {error:'Resource not found'});
    });

    return app;

});
