define('js/mc/ui/question',
    ['jquery',   'js/mc/ui/ve','js/mc/value', 'js/mc/option'],
function(   $, mcVisualElement,      mcValue,       mcOption) {

function mcQuestion(survey, prose) {
    this.ve = new mcVisualElement(survey);
    this.ve.element.addClass('mc-question');

    this.prose = new mcValue("", prose);
    this.ve.element.append(this.prose.html('<div class="mc-prose">'));

    this.contents = $('<div class="mc-contents">')
        .appendTo(this.ve.element);
}

mcQuestion.prototype.setVisible = function(value) {
    this.ve.visible.setValue(value)
}
mcQuestion.prototype.setProse = function(value) {
    this.prose.setValue(value)
}

mcQuestion.prototype.radio = function(options) {
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
    return this;
}

return mcQuestion;

});
