define('js/mc/ui/question', ['jquery'], function($) {

function mcQuestion(survey, prompt_text) {
    this.element = $('<div class="survey-question">');
    this.element.append(
        $('<div class="prompt">').html(prompt_text)
    );
}

mcQuestion.prototype.set_parent = function(parent_element) {
    this.element.detach().appendTo(parent_element);
}

return mcQuestion;

});
