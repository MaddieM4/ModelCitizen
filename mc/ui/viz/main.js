define('mc/ui/viz/main',
    ['jquery',  'mc/value', 'mc/ui/ve'],
    function($, mcValue,    mcVisualElement) {

var BASE_CONFIG = {
    title: 'Survey Title',
    description: 'A survey',
    baseUrl: '/api'
};

function mcVizMain(selector, config) {
    var self = this;
    this.ve = new mcVisualElement(this);
    this.ve.element.addClass('mc-viz');
    $(selector)
        .first()
        .empty()
        .append(this.ve.element);

    var _private = {
        responses: {},
    }
    this.getResponse = function(name) {
        if (_private[name] === undefined) {
            var val = new mcValue();
            _private[name] = val;

            // Load current value from DB
            self.loadResponse(name);
        }
        return _private[name];
    }

    this.config = $.extend(true, BASE_CONFIG, config);

    this.title = new mcValue("", this.config.title);
    this.ve.element.append(this.title.text('<div class="mc-survey-title">'));

    this.desc = new mcValue("", this.config.description);
    this.ve.element.append(this.desc.text('<div class="mc-survey-desc">'));

    this.contents = $('<div class="mc-survey-contents">').appendTo(this.ve.element);
}

mcVizMain.prototype.append = function(item) {
    // TODO: Make more flexible about input
    this.contents.append(item.ve.element);
    return this;
}

mcVizMain.prototype.loadResponse = function(name) {
    if (!this.config.name) {
        return;
    }
    var response = this.getResponse(name);
    var url = [this.config.baseUrl, 'resp', this.config.name, name, ''].join('/');
    $.ajax(url)
    .done(function(data) {
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

return mcVizMain;

});
