define('mc/rset', ['mc/value'], function(mcValue){

// A response is a value stored on the server, and associated with a specific
// (survey_id, response_id, user_id) tuple.
function mcResponseSet(api) {
    var self = this;
    self.api = api;

    var _private = {
        responses: {}
    }

    this.getResponse = function(name) {
        if (_private.responses[name] === undefined) {
            var val = new mcValue();
            _private.responses[name] = val;

            // Load current value from DB, and send changes when they happen
            self.loadResponse(name);
            val.subscribe(self.sendResponse.bind(self, name));
        }
        return _private.responses[name];
    }
}

mcResponseSet.prototype.sendResponse = function(name) {
    var response = this.getResponse(name);
    var params = { value: response.getValue() };

    this.api.call('POST /resp/$survey_id/$response_id/',
        { response_id: name },
        params
    ).done(function(ajax_response) {
        console.log("Successfully set " + name + " to:");
        console.log(params.value);
        console.log(ajax_response);
    }).fail(function(ajax_response) {
        console.error("Could not set " + name + " to:");
        console.error(params.value);
        console.error(ajax_response);
    });
}

mcResponseSet.prototype.loadResponse = function(name) {
    var response = this.getResponse(name);

    this.api.call('GET /resp/$survey_id/$response_id/',
        { response_id: name }
    ).done(function(data) {
        // TODO: store is-set data in DB, perhaps by row presence
        if (data.value === undefined) {
            response.unSet();
        } else {
            console.log("Setting " + name + " to " + JSON.stringify(data.value));
            response.setValue(data.value);
        }
    }).fail(function(jqXHR, textStatus) {
        console.error(textStatus);
        console.error(jqXHR.responseText);
    })
}

return mcResponseSet;

});
