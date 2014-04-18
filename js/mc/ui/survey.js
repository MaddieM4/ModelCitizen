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

    this.title = new mcValue("", this.config.title);
    this.ve.element.append(this.title.text('<div class="mc-survey-title">'));

    this.desc = new mcValue("", this.config.description);
    this.ve.element.append(this.desc.text('<div class="mc-survey-desc">'));
}

mcSurvey.prototype.append = function(item) {
    // TODO: Make more flexible
    this.ve.element.append(item.ve.element);
}

return mcSurvey;

});
