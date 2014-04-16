define('js/mc/survey', ['jquery', 'js/mc/items'], function($, mcItemList) {

var BASE_CONFIG = {
    title: 'Survey Title',
    description: 'A survey'
};

function mcSurvey(selector, config) {
    this.element = $(selector);
    this.config = $.extend(true, BASE_CONFIG, config);

    this.title = this.config.title;
    this.element.append($('<div class="survey-title">').text(this.title));

    this.description = this.config.description;
    this.element.append($('<div class="survey-description">').text(this.description));

    this.content = new mcItemList(
        $('<div class="survey-content">').appendTo(this.element)
    );
}

return mcSurvey;

});
