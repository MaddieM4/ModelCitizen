define('db', ['fs', 'sqlite3'], function(fs, sqlite3) {
    var filename = 'db.sqlite';
    exists = fs.existsSync(filename);

    sqlite3.verbose();
    var db = new sqlite3.Database(filename);

    db.serialize(function(){
        if (!exists) {
            db.run('CREATE TABLE surveys (name VARCHAR(255) PRIMARY KEY)');
            db.run('CREATE TABLE response ('
                +'survey_name VARCHAR(255) REFERENCES surveys(name),'
                +'response_name VARCHAR(255),'
                +'value TEXT)');
            db.run('CREATE UNIQUE INDEX response_location '
                +'ON response(survey_name, response_name)');
            db.run('CREATE TABLE migrations (date VARCHAR(128), version INTEGER)');
        }
    });

    return db;
});
