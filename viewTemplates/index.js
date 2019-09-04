const injectStyles = require('./injectStyles')
const injectScripts = require('./injectScripts')

module.exports = function (target, {
  withPropTypes,
  withConstructor,
  withConnect,
  withStyledComponents,
}) {
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Code Gen</title>
  <meta name="description" content="Code Gen">
  <meta name="author" content="Maksim Tarhunakau">

  ${injectStyles()}
</head>

<body>
  <div class="field-group">
    <label for="componentName">Component Name</label>
    <input type="text" id="componentName" />
  </div>
  
  ${withConstructor ? `<div class="field-group">
    <label for="generateConstructor">Generate Constructor</label>
    <input type="checkbox" id="generateConstructor" />
  </div>` : ''}
  
  ${withPropTypes ? `<div class="field-group">
    <label for="generatePropTypes">Generate Prop Types</label>
    <input type="checkbox" id="generatePropTypes" />
  </div>` : ''}

  ${withConnect ? `<div class="field-group">
    <label for="generateConnect">Generate Connect</label>
    <input type="checkbox" id="generateConnect" />
  </div>` : ''}

  ${withStyledComponents ? `<div class="field-group">
    <label for="generateStyledComponents">Generate Styled Components</label>
    <input type="checkbox" id="generateStyledComponents" />
  </div>` : ''}
  
  <div class="actions">
    <button id="submitButton">Save</button>
  </div>

  ${injectScripts(target)}
</body>
</html>
  `
}
