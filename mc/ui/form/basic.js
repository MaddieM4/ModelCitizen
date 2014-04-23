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
        option_string  = option_template
            .replace(/{{OPT_KEY}}/, option.key)
            .replace(/{{OPT_LABEL}}/, option.label);

        option_element = $(option_string);
        option_element.find('.store-data').data('opt-data', option.data);
        if (option_element.hasClass('store-data')) {
            option_element.data('opt-data', option.data);
        }
        this.element.append(option_element);
    }

    // Make sure events are triggered
    this.element.find('input').click(this.on_change.bind(this));

    return this;
}

function radio(value) {
    this.value = value || new mcValue()
    this.element = $('<form action="">');
    this.options = _options.bind(this,
        '<label><input type="radio" name="radio_question" class="store-data" ' +
        'value="{{OPT_KEY}}"/>{{OPT_LABEL}}</label><br/>');
    this.on_change = function() {
        var key = this.element.find('input:checked').data('opt-data');
        this.value.setValue(key);
    }
    this.subscription = this.value.subscribe(function(value) {
        this.element.find('input').each(function(_, el) {
            el = $(el);
            el.prop('checked', value.isSet() && value.getValue() === el.data('opt-data'));
        });
    }.bind(this));
}

function checkbox(value) {
    this.value = value || new mcValue([])
    this.element = $('<form action="">');
    this.options = _options.bind(this,
        '<label><input type="checkbox" name="check_question" class="store-data" ' +
        'value="{{OPT_KEY}}"/>{{OPT_LABEL}}</label><br/>');
    this.on_change = function() {
        var keys = this.element.find('input:checked').map(
            function(){ return $(this).data('opt-data'); }
        ).get();
        keys.length > 0 ? this.value.setValue(keys) : this.value.unSet();
    }
    this.subscription = this.value.subscribe(function(value) {
        var keys = value.isSet() ? value.getValue() : [];
        this.element.find('input').each(function(_, el) {
            el = $(el);
            el.prop('checked', keys.indexOf(el.data('opt-data')) != -1);
        });
    }.bind(this));
}

function dropdown(value) {
    this.value = value || new mcValue()
    this.element = $('<select>');
    this.options = _options.bind(this,
        '<option class="store-data" value="{{OPT_KEY}}">{{OPT_LABEL}}</option>');
    this.on_change = function() {
        var key = this.element.find('option:selected').data('opt-data');
        this.value.setValue(key);
    }
    this.element.change(this.on_change.bind(this));
    this.subscription = this.value.subscribe(function(value) {
        var val = value.getValue();
        var key = this.element.children().filter(function(){
            return $(this).data('opt-data') === val;
        }).val();
        this.element.val(key);
    }.bind(this));
}

return {
    'radio': radio,
    'checkbox': checkbox,
    'dropdown': dropdown
};

})
