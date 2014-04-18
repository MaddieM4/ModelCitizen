# Design planning document

There are a lot of moving parts in a framework. Having consistent ideas across the whole thing is important.

## Design principles

 * Composition over inheritence.
 * Validation works on both client and server.
 * Separate survey UI, storage, and visualization.
 * But easy to package them all together in a single declaration, for a response.
 * Procedural, but feels declarative thanks to wrappers.
 * Versioned states for response set.
 * Signal-based UI.
 * String names for things. No numeric IDs.
 * Impose no limits, but encourage sanity through limited interfaces.

## Accomplishing these goals

### Data model

A survey has a string ID. The expectation is that you can embed the survey by requiring '/surveys/$string_id' (or any other prefix).

Each respondant has a string ID. This can be token-based, or a pseudorandom string (hash of browser fingerprint + time-based seed).

Multiple responses may be associated with a (survey_id, respondant_id) tuple. Each response has a response_id (string) and a JSON value (stored as text in DB engines that don't have native JSON support). Only one response value may be stored per (survey_id, respondant_id, response_id).

Each response usually correlates to a single question.

### UI

A survey, in UI, has a survey_id and a respondant_id. It exports a JQuery detached DOM element containing the interface. It is responsible for batching and versioning changes to the response set.

A "visual element" is a component in the survey interface that may or may not be visible. Its state is dependent on response data, and it may report changes to response data. A survey contains a linear set of visual elements, each of which exports a JQDDE.

A question group is a visual element that encapsulates a set of questions. For example, a page's worth. You don't have to use question groups.

A question is a visual element that, usually, correlates to exactly one row in the response table (or thinking about it from a different model perspective, a single key/value in the response set table). It exports a JQDDE, like any visual element.

A response is a signal-pattern object that stores a value. When the value is changed, it will execute all its registered callbacks. A response has a string ID, and the survey contains a table of responses. You should always get your response objects through the survey, so that any question can register it as a dependency.

#### Question dependency system

This uses a bit of an AMD-style syntax, which sugars a more raw "get a response object from the survey and register callbacks on it" model. You are free to use the low-level API if you want.

```
q = new mcQuestion();
q.on(['>some_dep'], function(dep) {
    // Get read-only copy of some_dep object

    // Show q if dep question has been answered
    q.setVisible(dep.isSet());

    q.prose = "How has " + dep.getValue() + " affected your life?";
});
q.contents.append('<input class="the_input">');
q.on(['$input.the_input', '<output_response'], function(input, response) {
    // Listen to child element of q.contents for changes
    // Get write-only copy of output_response object

    var value = input.val();
    if (value.length == 0) {
        response.unSet(); // Don't treat empty values as valid
    } else {
        response.setValue(value);
    }
});
```

As you can see, each listed dependency is one of a few possible forms, given by single-char prefix:

 * `>` Read only response
 * `<` Write only response
 * `*` R/W response
 * `$` Element from q.contents (via q.contents.find)
