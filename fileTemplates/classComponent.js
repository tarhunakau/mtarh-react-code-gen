const ejs = require('ejs')

/**
 * 
 * @param {string} componentName Component name
 * @param {object} settings Configuration object
 * @param {boolean} settings.withPropTypes Include property types
 * @param {boolean} settings.withConstructor Include constructor
 */
module.exports = function (
  componentName, {
    withPropTypes,
    withConstructor,
  } = {
    withPropTypes: true,
    withConstructor: true,
  }
) {
  const template =
`import React from 'react'<% if (withPropTypes) { %>
import pt from 'prop-types'<% } %>

class ${componentName} extends React.Component {
<% if (withConstructor) { %>  constructor (props) {
    super(props)

    this.state = {}
  }

<% } %>  render () {
    return (
      <div>Code Me</div>
    )
  }
}
<% if (withPropTypes) { %>
${componentName}.propTypes = {}
${componentName}.defaultProps = {}
<% } %>
export default ${componentName}
`
  return ejs.render(template, { withPropTypes, withConstructor })
}
