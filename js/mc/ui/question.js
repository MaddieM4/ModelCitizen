define('js/mc/ui/question',
    ['jquery',   'js/mc/ui/ve','js/mc/value', 'js/mc/option', 'js/mc/listener'],
function(   $, mcVisualElement,      mcValue,       mcOption,      mcListener) {

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
    }
    self.listener.subscribers['$'] = function(name) {
        if (name === '') {
            return undefined;
        } else {
            return function(callback) {
                self.contents.find(name).on('click', callback);
            }
        }
    }
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
    // Remove any existing elements
    this.contents.empty();

    var form = $('<form action="">');
    for (var i=0; i<options.length; i++) {
        var opt = new mcOption(options[i], i);
        $('<label>')
            .text(opt.label)
            .prepend('<input type="radio" name="radio_question" value="'+opt.key+'">')
            .appendTo(form);
        form.append('<br>');
    }
    this.contents.append(form);

    this.on(['$input:radio', '<'+response_name], function(inputs, response) {
        var key = inputs.filter(':checked').attr('value');
        response.setValue(key);
    });
    return this;
}

return mcQuestion;

});
