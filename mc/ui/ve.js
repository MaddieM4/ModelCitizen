define('mc/ui/ve', ['jquery', 'mc/value'], function($, mcValue) {

function mcVisualElement(survey) {
    var self = this;
    self.survey  = survey;
    self.element = $('<div class="mc-ve">');
    self.visible = new mcValue(true);

    this.visible.subscribe(function(){
        var is_visible = self.visible.getValue();
        is_visible
            ? self.element.removeClass('mc-hidden')
            : self.element.addClass('mc-hidden')
            ;
    });
};

return mcVisualElement;

});
