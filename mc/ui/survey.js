define('mc/ui/survey',
    [ 'jquery','mc/rset',     'mc/api', 'mc/ui/ve',      'mc/value','mc/listener'],
    function($, mcResponseSet, mcApi,    mcVisualElement, mcValue,   mcListener) {

var BASE_CONFIG = {
    title: 'Survey Title',
    description: 'A survey',
    footer: 'Survey powered by <a href="https://github.com/campadrenalin/ModelCitizen">ModelCitizen</a> framework.',
    baseUrl: '/api',
    respondentName: 'Bongo McTweadlepants'
};

function mcSurvey(selector, config) {
    this.ve = new mcVisualElement(this);
    this.ve.element.addClass('mc-survey');
    $(selector)
        .first()
        .empty()
        .append(this.ve.element);

    this.config = $.extend(true, BASE_CONFIG, config);
    this.api = new mcApi({
        survey_id: this.config.name,
        respondent_id: this.config.respondentName
    });
    this.rset = new mcResponseSet(this.api);

    this.title = new mcValue("", this.config.title);
    this.ve.element.append(this.title.text('<div class="mc-survey-title">'));

    this.desc = new mcValue("", this.config.description);
    this.ve.element.append(this.desc.text('<div class="mc-survey-desc">'));

    this.contents = $('<div class="mc-survey-contents">').appendTo(this.ve.element);

    this.footer = new mcValue("", this.config.footer);
    this.ve.element.append(this.footer.html('<div class="mc-survey-footer">'));

    this.listener = new mcListener();
    this.listener.finders = {
        '>': this.getResponse.bind(this),
        '<': this.getResponse.bind(this),
        '*': this.getResponse.bind(this)
    };
    this.listener.subscribers = {
        '>': this.getResponse.bind(this),
        '<': function(){},
        '*': this.getResponse.bind(this)
    };
}

mcSurvey.prototype.append = function(item) {
    // TODO: Make more flexible about input
    this.contents.append(item.ve.element);
}

mcSurvey.prototype.on = function() {
    this.listener.on.apply(this.listener, arguments);
}

mcSurvey.prototype.getResponse = function(name) {
    return this.rset.getResponse(name);
}

mcSurvey.prototype.sendResponse = function(name) {
    return this.rset.sendResponse(name);
}

mcSurvey.prototype.loadResponse = function(name) {
    return this.rset.loadResponse(name);
}


return mcSurvey;

});
