module.exports = function (componentName) {
	return `import { connect } from 'react-redux'

import ${componentName} from './component'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(${componentName})
`;
}
