define('js/mc/ui/form/basic',
    ['jquery', 'js/mc/value', 'js/mc/option'],
    function($, mcValue,       mcOption) {

function _options(option_template, option_list) {
    var i, option, option_string;

    // Clear any existing options
    this.element.empty();

    // Create and add elements, based on option_list
    for (i=0; i<option_list.length; i++) {
        option         = new mcOption(option_list[i], i);
        option_string  = option_template
            .replace(/{{OPT_KEY}}/, option.key)
            .replace(/{{OPT_LABEL}}/, option.label);
        this.element.append(option_string);
    }

    // Make sure events are triggered
    this.element.find('input').click(this.on_change.bind(this));

    return this;
}

function radio(value) {
    this.value = value || new mcValue()
    this.element = $('<form action="">');
    this.options = _options.bind(this,
        '<label><input type="radio" name="radio_question" ' +
        'value="{{OPT_KEY}}"/>{{OPT_LABEL}}</label><br/>');
    this.on_change = function() {
        var key = this.element.find('input:checked').attr('value');
        this.value.setValue(key);
    }
    this.subscription = this.value.subscribe(function(value) {
        this.element.find('input').each(function(_, el) {
            el = $(el);
            el.prop('checked', value.isSet() && value.getValue() == el.val());
        });
    }.bind(this));
}

function checkbox(value) {
    this.value = value || new mcValue([])
    this.element = $('<form action="">');
    this.options = _options.bind(this,
        '<label><input type="checkbox" name="check_question" ' +
        'value="{{OPT_KEY}}"/>{{OPT_LABEL}}</label><br/>');
    this.on_change = function() {
        var keys = this.element.find('input:checked').map(
            function(){ return $(this).attr('value'); }
        ).get();
        keys.length > 0 ? this.value.setValue(keys) : this.value.unSet();
    }
    this.subscription = this.value.subscribe(function(value) {
        var keys = value.isSet() ? value.getValue() : [];
        this.element.find('input').each(function(_, el) {
            el = $(el);
            el.prop('checked', keys.indexOf(el.val()) != -1);
        });
    }.bind(this));
}

function dropdown(value) {
    this.value = value || new mcValue()
    this.element = $('<select>');
    this.options = _options.bind(this,
        '<option value="{{OPT_KEY}}">{{OPT_LABEL}}</option>');
    this.on_change = function() {
        var key = this.element.find('option:selected').val();
        this.value.setValue(key);
    }
    this.element.change(this.on_change.bind(this));
    this.subscription = this.value.subscribe(function(value) {
        this.element.val(value.getValue());
    }.bind(this));
}

return {
    'radio': radio,
    'checkbox': checkbox,
    'dropdown': dropdown
};

})
