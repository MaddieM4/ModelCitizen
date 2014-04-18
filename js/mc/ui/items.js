define('js/mc/ui/items', ['jquery'], function($) {

function mcItemList(element) {
    this.element = element;
    this.items = [];
}

mcItemList.prototype.append = function(item) {
    this.items.push(item);
    item.set_parent(this.element);
}

return mcItemList;

});
