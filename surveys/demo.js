define('surveys/demo', ['js/mc/ui/survey','js/mc/ui/question'], function(mcSurvey, mcQuestion) {

function DemoSurvey(selector) {
    var config = {
        title: 'Demo survey',
    }
    this.survey = new mcSurvey(selector, config);

    this.questions = [
        new mcQuestion(this.survey, "Firefighters are good for the economy.")
            .radio(['Yes', 'No'], 'firefighters'),
        new mcQuestion(this.survey, "Roads are good for the economy.")
            .radio([['Yes', 'yes'], 'No', {label:'Maybe', key:'m'}], 'roads')
            .on(['*firefighters', '$'], function(ff, contents) {
                contents.append('<p>Firefighters = ' + ff.getValue() + '</p>');
            })
    ];

    for (var i=0; i<this.questions.length; i++) {
        this.survey.append(this.questions[i]);
    }
}

return DemoSurvey;

});
