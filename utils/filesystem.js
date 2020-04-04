const fs = require('fs')
const vscode = require('vscode')

const generateClassComponentFile = require('../fileTemplates/classComponent')
const generateClassComponentTypeScriptFile = require('../fileTemplates/classComponentTS')
const generateFunctionalComponentFile = require('../fileTemplates/functionalComponent')
const generateFunctionalComponentTypeScriptFile = require('../fileTemplates/functionalComponentTS')
const generateComponentContainerFile = require('../fileTemplates/componentContainer')
const generateComponentContainerTypeScriptFile = require('../fileTemplates/componentContainerTS')
const generateFunctionalComponentIndexFile = require('../fileTemplates/functionalComponentIndex')
const generateStyledComponentStylesFile = require('../fileTemplates/styledComponentStyles')
const generateStorybookFile = require('../fileTemplates/storybookFile')

const FUNCTIONAL_COMPONENT_TYPE = 'FUNCTIONAL_COMPONENT_TYPE'
const FUNCTIONAL_COMPONENT_TYPESCRIPT_TYPE = 'FUNCTIONAL_COMPONENT_TYPESCRIPT_TYPE'
const CLASS_COMPONENT_TYPE = 'CLASS_COMPONENT_TYPE'
const CLASS_COMPONENT_TYPESCRIPT_TYPE = 'CLASS_COMPONENT_TYPESCRIPT_TYPE'
const COMPONENT_INDEX_TYPE = 'COMPONENT_INDEX_TYPE'
const COMPONENT_CONTAINER_TYPE = 'COMPONENT_CONTAINER_TYPE'
const COMPONENT_CONTAINER_TYPESCRIPT_TYPE = 'COMPONENT_CONTAINER_TYPESCRIPT_TYPE'

const STYLED_COMPONENT_STYLES_TYPE = 'STYLED_COMPONENT_STYLES_TYPE'
const STORYBOOK_FILE_TYPE = 'STORYBOOK_FILE_TYPE'

function createFolder (rootPath, componentName) {
	const folderName = `${rootPath}/${componentName}`
	if (fs.existsSync(folderName)) {
		vscode.window.showErrorMessage(`Folder with name \`${componentName}\` already exists!`)
		return false
	} else {
		fs.mkdirSync(folderName);
		return true
	}
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

		case FUNCTIONAL_COMPONENT_TYPESCRIPT_TYPE:
			return generateFunctionalComponentTypeScriptFile(componentName, settings)

		case CLASS_COMPONENT_TYPE:
			return generateClassComponentFile(componentName, settings)

		case CLASS_COMPONENT_TYPESCRIPT_TYPE:
			return generateClassComponentTypeScriptFile(componentName, settings)

		case COMPONENT_INDEX_TYPE:
			return generateFunctionalComponentIndexFile(componentName, settings)

		case STYLED_COMPONENT_STYLES_TYPE:
			return generateStyledComponentStylesFile(componentName, settings)

		case COMPONENT_CONTAINER_TYPE:
			return generateComponentContainerFile(componentName, settings)

		case COMPONENT_CONTAINER_TYPESCRIPT_TYPE:
			return generateComponentContainerTypeScriptFile(componentName, settings)

		case STORYBOOK_FILE_TYPE:
			return generateStorybookFile(componentName, settings)

		default:
			return ''
	}
}

module.exports = {
	FUNCTIONAL_COMPONENT_TYPE,
	FUNCTIONAL_COMPONENT_TYPESCRIPT_TYPE,
	CLASS_COMPONENT_TYPE,
	CLASS_COMPONENT_TYPESCRIPT_TYPE,
	COMPONENT_CONTAINER_TYPE,
	COMPONENT_CONTAINER_TYPESCRIPT_TYPE,
	COMPONENT_INDEX_TYPE,
	STYLED_COMPONENT_STYLES_TYPE,
	STORYBOOK_FILE_TYPE,
	createFolder,
	createFile,
}
