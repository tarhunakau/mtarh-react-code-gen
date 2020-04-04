const injectStyles = require('./injectStyles')
const injectScripts = require('./injectScripts')
const injectTypeScriptSettings = require('./injectTypeScriptSettings')
const injectConstructorSettings = require('./injectConstructorSettings')
const injectPropTypesSettings = require('./injectPropTypesSettings')
const injectConnectSettings = require('./injectConnectSettings')
const injectStyledComponentsSettings = require('./injectStyledComponentsSettings')
const injectStorybookSettings = require('./injectStorybookSettings')

module.exports = function (target, {
  withTypeScript,
  withPropTypes,
  withConstructor,
  withConnect,
  withStyledComponents,
  withStorybook,
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
  
  ${withTypeScript ? injectTypeScriptSettings() : ''}
  ${withConstructor ? injectConstructorSettings() : ''}
  ${withPropTypes ? injectPropTypesSettings() : ''}
  ${withConnect ? injectConnectSettings() : ''}
  ${withStyledComponents ? injectStyledComponentsSettings() : ''}
  ${withStorybook ? injectStorybookSettings() : ''}
  
  <div class="actions">
    <button id="submitButton">Save</button>
  </div>

  ${injectScripts(target)}
</body>
</html>
  `
}
