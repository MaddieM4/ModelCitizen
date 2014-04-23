define('surveys/demo',
    ['mc/ui/survey','mc/ui/question','mc/ui/text',  'mc/ui/group'],
    function( mcSurvey, mcQuestion,   mcTextDisplay, mcQuestionGroup) {

function DemoSurvey(selector) {
    var config = {
        title: 'Demo survey',
    }
    var s = new mcSurvey(selector, config);
    this.survey = s;

    this.questions = [
        new mcQuestion(s, "Firefighters are good for the economy.")
            .radio(['Yes', 'No'], 'firefighters'),
        new mcQuestion(s, "Roads are good for the economy.")
            .radio([['Yes', 'yes'], 'No', {label:'Maybe', key:'m'}], 'roads')
            .on(['*firefighters', '$'], function(ff, contents) {
                if (ff.isSet()) {
                    contents.append('<p>Firefighters = ' + ff.getValue() + '</p>');
                }
            }),
        new mcQuestion(s, "For what reasons do you hate freedom?")
            .checkbox([ ['Money', 'money'], ['Statism', 'statism'] ], 'hate-freedom')
            .on(['>roads', '?'], function(roads_response, q) {
                if (!roads_response.isSet() || roads_response.getValue() === 'yes') {
                    q.setVisible(false);
                } else {
                    q.setVisible(true);
                }
            }),
        new mcQuestion(s, "Mirror of roads question")
            .dropdown([['Yes', 'yes'], 'No', {label:'Maybe', key:'m'}], 'roads'),
        new mcQuestion(s, "Mirror of freedom question, extended")
            .checkbox([
                ['Money', 'money'],
                ['Statism', 'statism'],
                ['The liberals told me to', 'liberals'],
            ], 'hate-freedom'),
        new mcTextDisplay(s, "This is a text display.")
            .on(['>roads', '?'], function(roads_response, q) {
                var tail = roads_response.isSet()
                    ? ' Current "roads" value is ' + roads_response.getValue() + '.'
                    : ''
                    ;
                q.setProse('This is a text display.' + tail);
            }),
        new mcQuestion(s, "Show more questions (not yet implemented)")
            .yesno('show-more'),
        new mcQuestionGroup(s)
            .append(new mcTextDisplay(s, "This TD is in a group!"))
            .append(new mcQuestion(s, "How do you like these additional questions?")
                .radio([
                    ["They're not that good.", "not good"],
                    ["They're okay.", "okay"],
                    ["They're THE FREAKING BEST.", "best"]
                ], 'like-additional-questions')
            ).on(['>show-more', '?'], function(sm_value, group) {
                // Normalize out undefined, rather than playing with sm_value.isSet()
                group.setVisible(sm_value.getValue() ? true : false);
            })
    ];

    for (var i=0; i<this.questions.length; i++) {
        this.survey.append(this.questions[i]);
    }
}

return DemoSurvey;

});
