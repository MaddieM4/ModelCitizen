define('js/mc/ui/survey',
    [ 'jquery',   'js/mc/ui/ve', 'js/mc/value'],
    function($, mcVisualElement,      mcValue) {

var BASE_CONFIG = {
    title: 'Survey Title',
    description: 'A survey'
};

function mcSurvey(selector, config) {
    this.ve = new mcVisualElement(this);
    this.ve.element.appendTo(selector).addClass('mc-survey');

    this.config = $.extend(true, BASE_CONFIG, config);
    this.responses = {};

    this.title = new mcValue("");
    this.title.setValue(this.config.title);
    this.title.element = $('<div class="mc-survey-title">').text(this.config.title);
    this.title.subscribe(function(v){ v.element.text(v.getValue()); });

    this.desc = new mcValue("");
    this.desc.setValue(this.config.description);
    this.desc.element = $('<div class="mc-survey-desc">').text(this.config.description);
    this.desc.subscribe(function(v){ v.element.text(v.getValue()); });

    this.ve.element.append(this.title.element);
    this.ve.element.append(this.desc.element);
}

mcSurvey.prototype.append = function(item) {
    // TODO: Make more flexible
    this.ve.element.append(item.ve.element);
}

return mcSurvey;

});
