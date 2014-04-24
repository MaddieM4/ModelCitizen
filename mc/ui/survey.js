define('mc/ui/survey',
    [ 'jquery','mc/ui/ve',      'mc/value','mc/listener'],
    function($, mcVisualElement, mcValue,   mcListener) {

var BASE_CONFIG = {
    title: 'Survey Title',
    description: 'A survey',
    footer: 'Survey powered by <a href="https://github.com/campadrenalin/ModelCitizen">ModelCitizen</a> framework.',
    baseUrl: '/api'
};

function mcSurvey(selector, config) {
    var self = this;
    this.ve = new mcVisualElement(this);
    this.ve.element.addClass('mc-survey');
    $(selector)
        .first()
        .empty()
        .append(this.ve.element);

    // Only accessible via closures
    var _private = {
        responses: {},
    }

    this.config = $.extend(true, BASE_CONFIG, config);

    this.title = new mcValue("", this.config.title);
    this.ve.element.append(this.title.text('<div class="mc-survey-title">'));

    this.desc = new mcValue("", this.config.description);
    this.ve.element.append(this.desc.text('<div class="mc-survey-desc">'));

    this.contents = $('<div class="mc-survey-contents">').appendTo(this.ve.element);

    this.footer = new mcValue("", this.config.footer);
    this.ve.element.append(this.footer.html('<div class="mc-survey-footer">'));

    this.getResponse = function(name) {
        if (_private[name] === undefined) {
            var val = new mcValue();
            val.subscribe(self.sendResponse.bind(self, name));
            _private[name] = val;
        }
        return _private[name];
    }

    this.listener = new mcListener();
    this.listener.finders = {
        '>': this.getResponse,
        '<': this.getResponse,
        '*': this.getResponse
    };
    this.listener.subscribers = {
        '>': this.getResponse,
        '<': function(){},
        '*': this.getResponse
    };
}

mcSurvey.prototype.append = function(item) {
    // TODO: Make more flexible about input
    this.contents.append(item.ve.element);
}

mcSurvey.prototype.on = function() {
    this.listener.on.apply(this.listener, arguments);
}

mcSurvey.prototype.sendResponse = function(name) {
    if (!this.config.name) {
        return;
    }
    var response = this.getResponse(name);
    var url = [this.config.baseUrl, 'resp', this.config.name, name, ''].join('/');
    var data = { value: response.getValue() };
    function on_success(ajax_response) {
        console.log("Successfully set " + name + " to:");
        console.log(data.value);
        console.log(ajax_response);
    }
    function on_error(ajax_response) {
        console.error("Could not set " + name + " to:");
        console.error(data.value);
        console.error(ajax_response);
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: data
    }).done(function(data) {
        if (data.error !== undefined || !data.success) {
            on_error(data);
        } else {
            on_success(data);
        }
    }).fail(function(jqXHR, textStatus) {
        on_error(textStatus);
    });
}

return mcSurvey;

});
