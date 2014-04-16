define('surveys/demo', ['js/mc/survey','js/mc/question'], function(mcSurvey, mcQuestion) {

function DemoSurvey(selector) {
    var config = {
        title: 'Demo survey',
    }
    this.survey = new mcSurvey(selector, config);

    var questions = [
        new mcQuestion("Firefighters are good for the economy. Yes or no?")
    ];

    for (var i=0; i<questions.length; i++) {
        this.survey.content.append(questions[i]);
    }
}

return DemoSurvey;

});
