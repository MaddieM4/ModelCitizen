// Temporary solution, will not be relevant at all with multiple respondents
define('mc/ui/viz/table',
    ['jquery','mc/ui/ve',      'mc/value'],
function($,    mcVisualElement, mcValue) {

function mcVizTable(viz) {
    var self = this;

    self.viz = viz;
    self.ve = new mcVisualElement(viz);
    self.ve.element.addClass('mc-viz-table');

    self.contents = $('<table>').appendTo(self.ve.element);
    self.responses = new mcValue([], []);
    self.responses.subscribe(self.redraw.bind(self));
};

mcVizTable.prototype.append_response = function(name) {
    var response = {
        "name":  name,
        "value": this.viz.getResponse(name)
    };
    response.value.subscribe(this.redraw.bind(this));
    this.responses.setValue(this.responses.getValue().concat(response));
    return this;
}

mcVizTable.prototype.append_responses = function(responses) {
    for (var i = 0; i<responses.length; i++) {
        this.append_response(responses[i]);
    }
    return this;
}

mcVizTable.prototype.redraw = function() {
    var responses = this.responses.getValue();
    this.contents.empty();
    // TODO: Fix injection weakness here (respondent names like Bobby Tables)
    this.contents.append(
        '<thead><tr>'
        +'<td colspan="2" class="table-name">'+this.viz.config.respondentName+'</td>'
        +'</tr><tr>'
        +'<td width="170">Response name</td>'
        +'<td>Response value</td>'
        +'</tr></thead>'
    );
    for (var i = 0; i < responses.length; i++) {
        var element = $(document.createElement('tr'));
        var response = responses[i];
        $('<td>').text(response.name).appendTo(element);
        $('<td>').text(
            JSON.stringify(response.value.getValue())
        ).appendTo(element);
        this.contents.append(element);
    }
}

return mcVizTable;

});
