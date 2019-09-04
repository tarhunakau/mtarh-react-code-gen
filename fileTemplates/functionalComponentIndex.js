module.exports = function (componentName, { withConnect }) {
	return `import ${componentName} from './${withConnect ? 'container' : 'component'}'

export default ${componentName}
`;
}
