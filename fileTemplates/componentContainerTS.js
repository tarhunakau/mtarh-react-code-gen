module.exports = function (componentName) {
	const template = `import { connect } from 'react-redux'
import * as Redux from 'redux'
// TODO: change path to root reducer interface
import { ReduxState } from './my-root-reducer'
import ${componentName} from './component'
import { ConnectStateProps, ConnectDispatchProps } from './component'

const mapStateToProps = (state: ReduxState): ConnectStateProps => ({})
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): ConnectDispatchProps => ({})

export default connect<ConnectStateProps, ConnectDispatchProps>(
	mapStateToProps,
	mapDispatchToProps,
)(${componentName})
`;
	
	return template
}
