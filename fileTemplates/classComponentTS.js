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
    withConnect,
  } = {
    withPropTypes: true,
    withConstructor: true,
    withConnect: true,
  }
) {
  const template =
`import React from 'react'<% if (withPropTypes) { %>

interface ${componentName}ComponentProps {}
interface ${componentName}ComponentState {}<% if (withConnect) { %>

export interface ConnectStateProps {}
export interface ConnectDispatchProps {}

type ComponentProps = ConnectStateProps & ConnectDispatchProps & ${componentName}ComponentProps<% } %><% } %>

class ${componentName} extends React.Component<% if (withPropTypes) { %><<% if (withConnect) { %>ComponentProps<% } else { %>${componentName}ComponentProps<% } %>, ${componentName}ComponentState><% } %> {
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
  return ejs.render(template, {
    withPropTypes,
    withConstructor,
    withConnect,
  })
}
