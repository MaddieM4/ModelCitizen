# API reference

This API is primarily for internal use. It's also incredibly unstable. You have been warned. If you make stupid choices, like implementing a client for this spec in another language (and then having the spec move out from under you), that's on you.

## GET /api/resp/:survey/:response/:respondent/

**PARAMS:**

 * `survey` - survey ID
 * `response` - response ID
 * `respondent` - respondent ID

Get current response value for the given SID/RID/UID. Will be mime type application/json.

## POST /api/resp/:survey/:response/:respondent/

**PARAMS:**

 * `survey` - survey ID
 * `response` - response ID
 * `respondent` - respondent ID
 * `value` - value to set this response

# TODO

 * Getters for vizprep output
 * Survey deployment commands
