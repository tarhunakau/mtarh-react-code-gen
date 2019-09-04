module.exports = function (componentName, { withContainer }) {
	return `import ${componentName} from './${withContainer ? 'container' : 'component'}'

export default ${componentName}
`;
}
