define('js/mc/ui/question',
    ['jquery',   'js/mc/ui/ve','js/mc/value', 'js/mc/ui/form/basic', 'js/mc/listener'],
function(   $, mcVisualElement,      mcValue,                    fb,      mcListener) {

function mcQuestion(survey, prose) {
    var self = this;

    self.survey = survey;
    self.ve = new mcVisualElement(survey);
    self.ve.element.addClass('mc-question');

    self.prose = new mcValue("", prose);
    self.ve.element.append(self.prose.html('<div class="mc-prose">'));

    self.contents = $('<div class="mc-contents">')
        .appendTo(self.ve.element);

    self.listener = new mcListener(self.survey.listener);
    self.listener.finders['$'] = function(name) {
        if (name === '') {
            return self.contents;
        } else {
            return self.contents.find(name);
        }
    };
    self.listener.subscribers['$'] = function(name){};
    self.listener.finders['?'] = function(name) {
        return self;
    };
    self.listener.subscribers['?'] = function(){};
}

mcQuestion.prototype.setVisible = function(value) {
    this.ve.visible.setValue(value)
}
mcQuestion.prototype.setProse = function(value) {
    this.prose.setValue(value)
}

mcQuestion.prototype.on = function() {
    this.listener.on.apply(this.listener, arguments);
    return this;
}

mcQuestion.prototype.radio = function(options, response_name) {
    var radio = new fb.radio(this.survey.getResponse(response_name))
        .options(options);
    this.contents.empty().append(radio.element)
    this._radio = radio;
    return this;
}

mcQuestion.prototype.checkbox = function(options, response_name) {
    var cb = new fb.checkbox(this.survey.getResponse(response_name))
        .options(options);
    this.contents.empty().append(cb.element)
    return this;
}

return mcQuestion;

});
