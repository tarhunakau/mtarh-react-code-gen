const vscode = require('vscode');

const { capitalize } = require('./utils/stringUtils')
const viewTemplate = require('./viewTemplates')

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

function isAllowedConstructor(type) {
	switch (type) {
		case CLASS_COMPONENT_TYPE: return true
		default: return false
	}
}

function createConfigurationPanel(type, onPanelSubmitted) {
	const panel = vscode
		.window
		.createWebviewPanel(
			'componentSettings',
			'Component Settings',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
			}
		);
	
	panel
		.webview
		.html = viewTemplate(type, {
			withConstructor: isAllowedConstructor(type),
			withPropTypes: true,
			withConnect: true,
			withStyledComponents: true,
		})

	panel
		.webview
		.onDidReceiveMessage(function ({ data }) {
			onPanelSubmitted(data)
		})

	return panel
}

function generateFunctionalComponent(uri) {
	const { fsPath } = uri;

	const panel = createConfigurationPanel(FUNCTIONAL_COMPONENT_TYPE, function (data) {
		const {
			componentName,
			withPropTypes,
			withConnect,
			withStyledComponents,
		} = data

		panel.dispose()

		if (!componentName) {
			throw new Error('Component name should be filled');
		}

		const name = capitalize(componentName)

		createFolder(fsPath, name);

		createFile(fsPath, name, 'component.jsx', FUNCTIONAL_COMPONENT_TYPE, {
			withPropTypes,
		});

		createFile(fsPath, name, 'index.js', COMPONENT_INDEX_TYPE, {
			withConnect,
		});

		if (withStyledComponents) {
			createFile(fsPath, name, 'styles.js', STYLED_COMPONENT_STYLES_TYPE);
		}

		if (withConnect) {
			createFile(fsPath, name, 'container.js', COMPONENT_CONTAINER_TYPE);
		}
	})
}

function generateClassComponent(uri) {
	const { fsPath } = uri;

	const panel = createConfigurationPanel(CLASS_COMPONENT_TYPE, function (data) {
		const {
			componentName,
			withConstructor,
			withPropTypes,
			withConnect,
			withStyledComponents,
		} = data

			panel.dispose()

			if (!componentName) {
				throw new Error('Component name should be filled');
			}

			const name = capitalize(componentName)

			createFolder(fsPath, name);

			createFile(fsPath, name, 'component.jsx', CLASS_COMPONENT_TYPE, {
				withConstructor,
				withPropTypes,
			});

			createFile(fsPath, name, 'index.js', COMPONENT_INDEX_TYPE, {
				withConnect,
			});

			if (withStyledComponents) {
				createFile(fsPath, name, 'styles.js', STYLED_COMPONENT_STYLES_TYPE);
			}
			
			if (withConnect) {
				createFile(fsPath, name, 'container.js', COMPONENT_CONTAINER_TYPE);
			}
	})
}

module.exports = {
	activate,
	deactivate
}
