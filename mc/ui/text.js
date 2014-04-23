define('mc/ui/text',
    ['mc/ui/ve',             'mc/value','mc/listener'],
    function(mcVisualElement, mcValue,   mcListener) {

function mcTextDisplay(survey, prose) {
    var self = this;

    self.survey = survey;
    self.ve = new mcVisualElement(survey);
    self.ve.element.addClass('mc-question mc-text');

    self.prose = new mcValue("", prose);
    self.ve.element.append(self.prose.html('<div class="mc-prose">'));

    self.listener = new mcListener(self.survey.listener);
    self.listener.finders['?'] = function(name) {
        return self;
    };
    self.listener.subscribers['?'] = function(){};
}

mcTextDisplay.prototype.setVisible = function(value) {
    this.ve.visible.setValue(value)
}
mcTextDisplay.prototype.setProse = function(value) {
    this.prose.setValue(value)
}

mcTextDisplay.prototype.on = function() {
    this.listener.on.apply(this.listener, arguments);
    return this;
}

return mcTextDisplay;

});
