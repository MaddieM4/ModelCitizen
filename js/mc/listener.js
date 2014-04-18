define('js/mc/listener', ['jquery'], function($) {

function mcListener(parent_listener) {
    this.finders = {};
    this.subscribers = {};

    if (parent_listener !== undefined) {
        $.extend(this.finders, parent_listener.finders);
        $.extend(this.subscribers, parent_listener.subscribers);
    }
};

// Take a series of dependencies, and a callback, and return
// a single closure that accepts no arguments.
//
// When the closure is called, the callback will get all the
// resolved dependencies as arguments. These are resolved at
// wrap time.
mcListener.prototype.wrap = function(deps, callback) {

    // Resolve arguments
    var args = [];
    for (var d=0; d<deps.length; d++) {
        var dep = deps[d];
        var type = dep.slice(0,1);
        var name = dep.slice(1);
        var finder = this.finders[type];

        if (finder === undefined) {
            throw "No finder for type '"+type+"'";
        }
        args.push(finder(name));
    }

    // Tuck args into a nice warm closure
    return function() {
        return callback.apply(callback, args);
    }
}

// Subscribe a callback to multiple signals, based on deps.
mcListener.prototype.multiSubscribe = function(deps, callback) {
    for (var d=0; d<deps.length; d++) {
        var dep = deps[d];
        var type = dep.slice(0,1);
        var name = dep.slice(1);
        var subscriber = this.subscribers[type];

        if (subscriber === undefined) {
            throw "No subscriber for type '"+type+"'";
        }

        // undefined is a valid value for a subscriber function to return.
        // It indicates that there is nothing to subscribe to.
        var signal = subscriber(name);
        if (signal !== undefined) {
            signal.subscribe(callback);
        }
    }
}

// Combined multiSubscribe and wrap - this is where the magic happens.
mcListener.prototype.on = function(deps, callback) {
    var wrapped_closure = this.wrap(deps, callback);
    this.multiSubscribe(deps, wrapped_closure);
}

return mcListener;

});
