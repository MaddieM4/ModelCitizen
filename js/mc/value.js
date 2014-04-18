define('js/mc/value', ['jquery'], function($) {

function mcValue(default_value, initial_value) {
    // Make this data available to methods, as closures,
    // But do not leak it to the outside world.
    var _private = {
        'value': initial_value,
        'set': !(initial_value === undefined),
        'default': default_value,
        'subscriptions': []
    };
    var self = this;

    // On change, do callbacks
    function onChange() {
        for (var i = 0; i < _private.subscriptions.length; i++) {
            var callback = _private.subscriptions[i];
            if (typeof callback == 'function') {
                callback(self);
            }
        }
    }

    this.getValue = function() {
        return _private.set ? _private.value : _private.default;
    }
    this.setValue = function(new_value) {
        _private.value = new_value;
        _private.set = true;
        onChange();
    }

    this.isSet = function() {
        return _private.set;
    }
    this.unSet = function() {
        _private.value = undefined;
        _private.set = false;
        onChange();
    };

    // Provide ID of registered callback
    this.subscribe = function(callback) {
        var length = _private.subscriptions.push(callback);
        return length-1;
    }
    this.unSubscribe = function(id) {
        _private.subscriptions[id] = null;
    }
};

//// UI FUNCTIONS (BROWSER ONLY) ==============================================

// Create element whose content is filled with value's content,
// based on the JQuery element.text() function.
mcValue.prototype.text = function(selector) {
    var element = $(selector).text(this.getValue());
    this.subscribe(function(v){
        element.text( v.getValue() );
    });
    return element;
}

// Create element whose content is filled with value's content,
// based on the JQuery element.html() function.
mcValue.prototype.html = function(selector) {
    var element = $(selector).html(this.getValue());
    this.subscribe(function(v){
        element.html( v.getValue() );
    });
    return element;
}

return mcValue;

});
