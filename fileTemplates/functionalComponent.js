const ejs = require('ejs')

/**
 * 
 * @param {string} componentName Component name
 * @param {object} settings Configuration object
 * @param {boolean} settings.withPropTypes Include property types
 */
module.exports = function (
  componentName, {
    withPropTypes,
  } = {
    withPropTypes: false,
  }
) {
  const template =
`import React from 'react'<% if (withPropTypes) { %>
import pt from 'prop-types'<% } %>

const ${componentName} = () => (
  <div>Code Me</div>
)
<% if (withPropTypes) { %>
${componentName}.propTypes = {}
${componentName}.defaultProps = {}
<% } %>
export default ${componentName}
`
  return ejs.render(template, { withPropTypes })
}
