define('js/mc/value', [], function() {

function mcValue(default_value) {
    // Make this data available to methods, as closures,
    // But do not leak it to the outside world.
    var _private = {
        'value': undefined,
        'set': false,
        'default': default_value,
        'subscriptions': []
    };

    // On change, do callbacks
    function onChange() {
        for (var i = 0; i < _private.subscriptions.length; i++) {
            var callback = _private.subscriptions[i];
            if (typeof callback == 'function') {
                callback(this)
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

return mcValue;

});
