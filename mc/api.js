define('mc/api', ['jquery'], function($) {

BASE_CONFIG = {
    'base_url': '/api',
}

function mcApi(config) {
    this.config = $.extend({}, BASE_CONFIG, config);
}

// Interpolate config variables into URL
mcApi.prototype.interpolate = function(url, extension) {
    var source = $.extend({}, this.config, extension);
    function replacer(_, variable) {
        var data = source[variable];
        if (typeof data !== 'string') {
            throw "Expected config variable "+variable+" to be type string, not "+typeof data;
        }
        return data;
    }
    return url
        .replace(/\$(\w+)/g, replacer)
        .replace(/\$\{(\w+)\}/g, replacer);
}

// Given a URL and an optional extension to the interpolation source data,
// return a method and an actual URL.
mcApi.prototype.interpret_url = function(url, extension) {
    // Get method, if prepended
    var method_finder = /^([A-Z]+) /;
    var method = 'GET';
    url = url.replace(method_finder, function(match, p1) {
        method = p1;
        return '';
    });

    url = this.interpolate('${base_url}' + url, extension);

    return {
        'method': method,
        'href': url
    };
}

mcApi.prototype.call = function(url, extension, params) {
    url = this.interpret_url(url, extension);

    return $.ajax({
        "url": url.href,
        "type": url.method,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(params)
    });
};

return mcApi;

});
