define('js/mc/ui/group',
    ['js/mc/ui/ve', 'js/mc/value', 'js/mc/listener'],
    function(mcVisualElement, mcValue, mcListener) {

function mcQuestionGroup(survey) {
    var self = this;

    self.survey = survey;
    self.ve = new mcVisualElement(survey);
    self.ve.element.addClass('mc-group');

    self.listener = new mcListener(self.survey.listener);
    self.listener.finders['?'] = function(name) {
        return self;
    };
    self.listener.subscribers['?'] = function(){};
}

mcQuestionGroup.prototype.setVisible = function(value) {
    this.ve.visible.setValue(value)
}
mcQuestionGroup.prototype.on = function() {
    this.listener.on.apply(this.listener, arguments);
    return this;
}

mcQuestionGroup.prototype.append = function(item) {
    this.ve.element.append(item.ve.element);
    return this;
}

return mcQuestionGroup;

});
