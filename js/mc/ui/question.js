define('js/mc/ui/question',
    ['jquery',   'js/mc/ui/ve','js/mc/value', 'js/mc/option'],
function(   $, mcVisualElement,      mcValue,       mcOption) {

function mcQuestion(survey, prose) {
    this.survey = survey;
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

    var response = this.survey.getResponse(response_name);
    form.find('input').click(function(){
        var el = $(this);
        var key = el.attr('value');
        response.setValue(key);
    });
    return this;
}

return mcQuestion;

});
