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
    withConnect,
  } = {
    withPropTypes: false,
    withConnect: false,
  }
) {
  const template =
`import React from 'react'<% if (withPropTypes) { %>

interface ${componentName}ComponentProps {}<% if (withConnect) { %>

export interface ConnectStateProps {}
export interface ConnectDispatchProps {}

type ComponentProps = ConnectStateProps & ConnectDispatchProps & ${componentName}ComponentProps<% } %><% } %>

const ${componentName} = (props<% if (withPropTypes) { %>: <% if (withConnect) { %>ComponentProps<% } else { %>${componentName}ComponentProps<% } %><% } %>) => (
  <div>Code Me</div>
)
export default ${componentName}
`
  return ejs.render(template, { withPropTypes, withConnect })
}
