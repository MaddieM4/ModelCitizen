define('surveys/demo',
    ['js/mc/ui/survey','js/mc/ui/question','js/mc/ui/text'],
    function( mcSurvey, mcQuestion,         mcTextDisplay) {

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
                if (ff.isSet()) {
                    contents.append('<p>Firefighters = ' + ff.getValue() + '</p>');
                }
            }),
        new mcQuestion(this.survey, "For what reasons do you hate freedom?")
            .checkbox([ ['Money', 'money'], ['Statism', 'statism'] ], 'hate-freedom')
            .on(['>roads', '?'], function(roads_response, q) {
                if (!roads_response.isSet() || roads_response.getValue() === 'yes') {
                    q.setVisible(false);
                } else {
                    q.setVisible(true);
                }
            }),
        new mcQuestion(this.survey, "Mirror of roads question")
            .dropdown([['Yes', 'yes'], 'No', {label:'Maybe', key:'m'}], 'roads'),
        new mcQuestion(this.survey, "Mirror of freedom question, extended")
            .checkbox([
                ['Money', 'money'],
                ['Statism', 'statism'],
                ['The liberals told me to', 'liberals'],
            ], 'hate-freedom'),
        new mcTextDisplay(this.survey, "This is a text display.")
            .on(['>roads', '?'], function(roads_response, q) {
                var tail = roads_response.isSet()
                    ? ' Current "roads" value is ' + roads_response.getValue() + '.'
                    : ''
                    ;
                q.setProse('This is a text display.' + tail);
            }),
        new mcQuestion(this.survey, "Show more questions (not yet implemented)")
            .yesno('show-more')
    ];

    for (var i=0; i<this.questions.length; i++) {
        this.survey.append(this.questions[i]);
    }
}

return DemoSurvey;

});
