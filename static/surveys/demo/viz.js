define('surveys/demo/viz',
    ['surveys/demo/config','mc/ui/viz'],
    function(config,       mcViz){

function DemoViz(selector){
    return mcViz(selector, config);
}

return DemoViz;

});
