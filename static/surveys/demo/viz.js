define('surveys/demo/viz',
    ['surveys/demo/config','mc/ui/viz/main','mc/ui/viz/table'],
    function(config,       mcVizMain,       mcVizTable){

function DemoViz(selector){
    var viz = new mcVizMain(selector, config);
    viz.table = new mcVizTable(viz).append_responses([
        'firefighters',
        'roads',
        'hate-freedom',
        'show-more',
        'like-additional-questions',
    ]);

    viz.append(viz.table);

    return viz;
}

return DemoViz;

});
