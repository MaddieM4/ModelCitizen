define('js/mc/ui/question',
    [      'js/mc/ui/ve','js/mc/value'],
function(mcVisualElement,     mcValue) {

function mcQuestion(survey, prose) {
    this.ve = new mcVisualElement(survey);
    this.ve.element.addClass('mc-question');

    this.prose = new mcValue("");
    this.prose.setValue(prose);
    this.prose.element = $('<div class="mc-prose">').html(prose);
    this.prose.subscribe(function(v){ v.element.html(v.getValue()); });
    this.ve.element.append(this.prose.element);

    this.contents = $('<div class="mc-contents">')
        .appendTo(this.ve.element);
}

mcQuestion.prototype.setVisible = function(value) {
    this.ve.visible.setValue(value)
}
mcQuestion.prototype.setProse = function(value) {
    this.prose.setValue(value)
}

return mcQuestion;

});
