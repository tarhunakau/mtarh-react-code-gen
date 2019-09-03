module.exports = function (componentName) {
	return `import ${componentName} from './container'

export default ${componentName}
`;
}
