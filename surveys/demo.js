define('surveys/demo', ['js/mc/ui/survey','js/mc/ui/question'], function(mcSurvey, mcQuestion) {

function DemoSurvey(selector) {
    var config = {
        title: 'Demo survey',
    }
    this.survey = new mcSurvey(selector, config);

    var questions = [
        new mcQuestion(this.survey, "Firefighters are good for the economy.")
    ];

    for (var i=0; i<questions.length; i++) {
        this.survey.append(questions[i]);
    }
}

return DemoSurvey;

});
