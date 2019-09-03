const vscode = require('vscode');

const { capitalize } = require('./utils/stringUtils')

const {
	createFile,
	createFolder,
	FUNCTIONAL_COMPONENT_TYPE,
	CLASS_COMPONENT_TYPE,
	COMPONENT_CONTAINER_TYPE,
	COMPONENT_INDEX_TYPE,
	STYLED_COMPONENT_STYLES_TYPE,
} = require('./utils/filesystem')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context
		.subscriptions
		.push(
			vscode.commands.registerCommand(
				'extension.mtarhReactCodeGen.functionalComponent',
				generateFunctionalComponent
			)
		);
	
	context
		.subscriptions
		.push(
			vscode.commands.registerCommand(
				'extension.mtarhReactCodeGen.classComponent',
				generateClassComponent
			)
		);
}

exports.activate = activate;

function deactivate() {}

function generateFunctionalComponent(uri) {
	const { fsPath } = uri;

	vscode
		.window
		.showInputBox()
		.then(function (componentName) {
			if (!componentName) {
				throw new Error('Component name should be filled');
			}

			const name = capitalize(componentName)

			createFolder(fsPath, name);
			createFile(fsPath, name, 'component.jsx', FUNCTIONAL_COMPONENT_TYPE);
			createFile(fsPath, name, 'index.js', COMPONENT_INDEX_TYPE);
			createFile(fsPath, name, 'styles.js', STYLED_COMPONENT_STYLES_TYPE);
			createFile(fsPath, name, 'container.js', COMPONENT_CONTAINER_TYPE);
		});
}

function generateClassComponent(uri) {
	const { fsPath } = uri;

	vscode
		.window
		.showInputBox()
		.then(function (componentName) {
			if (!componentName) {
				throw new Error('Component name should be filled');
			}

			const name = capitalize(componentName)

			createFolder(fsPath, name);
			createFile(fsPath, name, 'component.jsx', CLASS_COMPONENT_TYPE);
			createFile(fsPath, name, 'index.js', COMPONENT_INDEX_TYPE);
			createFile(fsPath, name, 'styles.js', STYLED_COMPONENT_STYLES_TYPE);
			createFile(fsPath, name, 'container.js', COMPONENT_CONTAINER_TYPE);
		});
}

module.exports = {
	activate,
	deactivate
}
