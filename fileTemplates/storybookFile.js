module.exports = function (componentName) {
  return `import React from 'react'
import { storiesOf } from '@storybook/react'
import ${componentName} from './component'

storiesOf('${componentName}', module)
  .add('default', () => (
    <${componentName} />
  ))
  `;
}
