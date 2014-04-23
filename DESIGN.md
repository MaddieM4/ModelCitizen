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

    q.setProse("How has " + dep.getValue() + " affected your life?");
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

Read access implies both *subscription* and *initialization.* When any of the subscribed responses are changed, the .on() callback is re-run. But also, when the survey is first loaded, we poll that data, and run the callback (as if it had changed) with those initial values. This allows us to calculate visibility before putting anything onto the screen.

#### Visibility

Each visual element has a .setVisible(bool) function, which sets whether the question is visible or not. By default, this is `true`. But you can set elements to be invisible, which has two effects:

1. Object, and children, are not rendered on page. They are actually not present in the page DOM, except for a placeholder.
2. We don't calculate the visibility or callbacks of any child elements.

These optimizations allow us to have a client-side map of the whole survey, without expending much resources (or incurring startup latency) for things not on the page.

## Server design

We have the following use cases to consider:

 * Static file hosting
    * Embedding
    * Hosted survey frontend
    * Hosted viz frontend
 * API backend

A server may host frontend stuff, without hosting any backend stuff, or vice versa.

### Static file hosting

Can basically be handled by nginx.

### Frontend apps

Get variables via URL, for example, who you are and which survey to view. Mostly defers to a few templates, which in turn defer to statically-hosted data.

### API Backend

Server that communicates with database. Must have access to surveys for validation purposes.

In order to run continuously, we must be able to enable and disable surveys via REST calls.

## Deployment workflow

 * Develop purely client-side, by leaving survey URL blank.
 * Survey is made of these components:
    * UI (client)
    * Validation (client, server)
    * VizPrep (server)
    * Viz (client)
 * When you have the first two pretty well-tested in the browser, hit a backend URL to (re)load the survey in the backend.
 * Test for errors, populate data.
 * Write VizPrep and Viz components.
 * Reload survey in backend.
 * Test visualization.
