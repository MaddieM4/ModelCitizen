define('js/mc/option',[], function(){

function mcOption(item, key) {
    this.source = item;
    switch (typeof item) {
    case "string":
        this.label = item;
        this.key   = key;
        break;
    case "object":
        if (Array.isArray(item)) {
            if (item.length != 2) {
                throw "Expected array of 2 elements, got " + item.length;
            }
            this.label = item[0];
            this.key   = item[1];
        } else {
            this.label = item.label;
            this.key   = item.key;
        }
        break;
    default:
        throw "Unknown type given as option source";
    }
}

return mcOption;

});
