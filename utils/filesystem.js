const fs = require('fs')

const generateClassComponentFile = require('../fileTemplates/classComponent')
const generateFunctionalComponentFile = require('../fileTemplates/functionalComponent')
const generateComponentContainerFile = require('../fileTemplates/componentContainer')
const generateFunctionalComponentIndexFile = require('../fileTemplates/functionalComponentIndex')
const generateStyledComponentStylesFile = require('../fileTemplates/styledComponentStyles')

const FUNCTIONAL_COMPONENT_TYPE = 'FUNCTIONAL_COMPONENT_TYPE'
const CLASS_COMPONENT_TYPE = 'CLASS_COMPONENT_TYPE'
const COMPONENT_INDEX_TYPE = 'COMPONENT_INDEX_TYPE'
const COMPONENT_CONTAINER_TYPE = 'COMPONENT_CONTAINER_TYPE'

const STYLED_COMPONENT_STYLES_TYPE = 'STYLED_COMPONENT_STYLES_TYPE'

function createFolder (rootPath, componentName) {
	fs.mkdirSync(`${rootPath}/${componentName}`);
}

function createFile (rootPath, componentName, fileName, type, settings = {}) {
	const targetPath = `${rootPath}/${componentName}/${fileName}`
	const fileContent = generateFileContent(componentName, type, settings)

	fs.writeFileSync(targetPath, fileContent);
}

function generateFileContent (componentName, type, settings = {}) {
	switch (type) {
		case FUNCTIONAL_COMPONENT_TYPE:
			return generateFunctionalComponentFile(componentName, settings)

		case CLASS_COMPONENT_TYPE:
			return generateClassComponentFile(componentName, settings)

		case COMPONENT_INDEX_TYPE:
			return generateFunctionalComponentIndexFile(componentName, settings)

		case STYLED_COMPONENT_STYLES_TYPE:
			return generateStyledComponentStylesFile(componentName, settings)

		case COMPONENT_CONTAINER_TYPE:
			return generateComponentContainerFile(componentName, settings)

		default:
			return ''
	}
}

module.exports = {
	FUNCTIONAL_COMPONENT_TYPE,
	CLASS_COMPONENT_TYPE,
	COMPONENT_CONTAINER_TYPE,
	COMPONENT_INDEX_TYPE,
	STYLED_COMPONENT_STYLES_TYPE,
	createFolder,
	createFile,
}
