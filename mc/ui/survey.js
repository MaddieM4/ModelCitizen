define('mc/ui/survey',
    [ 'jquery','mc/ui/ve',      'mc/value','mc/listener'],
    function($, mcVisualElement, mcValue,   mcListener) {

var BASE_CONFIG = {
    title: 'Survey Title',
    description: 'A survey',
    footer: 'Survey powered by <a href="https://github.com/campadrenalin/ModelCitizen">ModelCitizen</a> framework.'
};

function mcSurvey(selector, config) {
    this.ve = new mcVisualElement(this);
    this.ve.element.appendTo(selector).addClass('mc-survey');

    // Only accessible via closures
    var _private = {
        responses: {},
    }

    this.config = $.extend(true, BASE_CONFIG, config);

    this.title = new mcValue("", this.config.title);
    this.ve.element.append(this.title.text('<div class="mc-survey-title">'));

    this.desc = new mcValue("", this.config.description);
    this.ve.element.append(this.desc.text('<div class="mc-survey-desc">'));

    this.contents = $('<div class="mc-survey-contents">').appendTo(this.ve.element);

    this.footer = new mcValue("", this.config.footer);
    this.ve.element.append(this.footer.html('<div class="mc-survey-footer">'));

    this.getResponse = function(name) {
        if (_private[name] === undefined) {
            _private[name] = new mcValue();
        }
        return _private[name];
    }

    this.listener = new mcListener();
    this.listener.finders = {
        '>': this.getResponse,
        '<': this.getResponse,
        '*': this.getResponse
    };
    this.listener.subscribers = {
        '>': this.getResponse,
        '<': function(){},
        '*': this.getResponse
    };
}

mcSurvey.prototype.append = function(item) {
    // TODO: Make more flexible about input
    this.contents.append(item.ve.element);
}

mcSurvey.prototype.on = function() {
    this.listener.on.apply(this.listener, arguments);
}

return mcSurvey;

});
