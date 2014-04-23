var requirejs = require('requirejs');

requirejs.config({
    // Fallback for CommonJS modules
    nodeRequire: require
});

requirejs(['express','console','frontend','api'], function(express, console, fe, api) {
    // Create and configure application
    var app = express();
    app.use(express.static('./static'));
    app.use(fe);
    app.use('/api', api);

    // Run
    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });
});
