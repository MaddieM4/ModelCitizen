define('js/mc/ui/form/basic',
    ['jquery', 'js/mc/value', 'js/mc/option'],
    function($, mcValue,       mcOption) {

function _options(option_template, option_list) {
    var i, option, option_string, option_element;

    // Clear any existing options
    this.element.empty();

    // Create and add elements, based on option_list
    for (i=0; i<option_list.length; i++) {
        option         = new mcOption(option_list[i], i);
        option_string  = option_template.replace(/{{OPT_KEY}}/, option.key);
        option_element = $('<label>')
            .text(option.label)
            .prepend(option_string);
        this.element.append(option_element).append('<br>');
    }

    // Make sure events are triggered
    this.element.find('input').click(this.on_change.bind(this));

    return this;
}

function radio(value) {
    this.value = value || new mcValue()
    this.element = $('<form action="">');
    this.options = _options.bind(this,
        '<input type="radio" name="radio_question" value="{{OPT_KEY}}">');
    this.on_change = function() {
        var key = this.element.find('input:checked').attr('value');
        this.value.setValue(key);
    }
}

function checkbox(value) {
    this.value = value || new mcValue()
    this.element = $('<form action="">');
    this.options = _options.bind(this,
        '<input type="checkbox" name="check_question" value="{{OPT_KEY}}">');
    this.on_change = function() {
        var keys = this.element.find('input:checked').map(
            function(){ return $(this).attr('value'); }
        ).get();
        keys.length > 0 ? this.value.setValue(keys) : this.value.unSet();
    }
}

return {
    'radio': radio,
    'checkbox': checkbox
};

})
