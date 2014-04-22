define('js/mc/option',[], function(){

function mcOption(item, key) {
    this.source = item;
    switch (typeof item) {
    case "string":
        this.label = item;
        this.key   = key.toString();
        this.data  = key;
        break;
    case "object":
        if (Array.isArray(item)) {
            if (item.length < 2 || item.length > 3) {
                throw "Expected array of 2-3 elements, got " + item.length;
            }
            this.label = item[0];
            this.key   = item[1].toString();
            this.data  = item.length == 3 ? item[2] : item[1];
        } else {
            this.label = item.label;
            this.key   = item.key.toString();
            this.data  = item.hasOwnProperty('data') ? item.data : item.key;
        }
        break;
    default:
        throw "Unknown type given as option source";
    }
}

return mcOption;

});
