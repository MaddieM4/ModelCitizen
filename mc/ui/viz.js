define('mc/ui/viz',
    ['jquery',  'mc/value', 'mc/ui/ve'],
    function($, mcValue,    mcVisualElement) {

var BASE_CONFIG = {
    title: 'Survey Title',
    description: 'A survey',
    baseUrl: '/api'
};

function mcViz(selector, config) {
    var self = this;
    this.ve = new mcVisualElement(this);
    this.ve.element.addClass('mc-viz');
    $(selector)
        .first()
        .empty()
        .append(this.ve.element);

    this.config = $.extend(true, BASE_CONFIG, config);

    this.title = new mcValue("", this.config.title);
    this.ve.element.append(this.title.text('<div class="mc-survey-title">'));

    this.desc = new mcValue("", this.config.description);
    this.ve.element.append(this.desc.text('<div class="mc-survey-desc">'));

    this.contents = $('<div class="mc-survey-contents">').appendTo(this.ve.element);
}

mcViz.prototype.append = function(item) {
    // TODO: Make more flexible about input
    this.contents.append(item.ve.element);
}

return mcViz;

});
