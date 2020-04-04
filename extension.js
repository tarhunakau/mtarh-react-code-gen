const vscode = require('vscode');

const { capitalize } = require('./utils/stringUtils')
const viewTemplate = require('./viewTemplates')

const {
	createFile,
	createFolder,
	FUNCTIONAL_COMPONENT_TYPE,
	FUNCTIONAL_COMPONENT_TYPESCRIPT_TYPE,
	CLASS_COMPONENT_TYPE,
	CLASS_COMPONENT_TYPESCRIPT_TYPE,
	COMPONENT_CONTAINER_TYPE,
	COMPONENT_CONTAINER_TYPESCRIPT_TYPE,
	COMPONENT_INDEX_TYPE,
	STYLED_COMPONENT_STYLES_TYPE,
	STORYBOOK_FILE_TYPE,
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
				generateComponent(FUNCTIONAL_COMPONENT_TYPE)
			)
		);
	
	context
		.subscriptions
		.push(
			vscode.commands.registerCommand(
				'extension.mtarhReactCodeGen.classComponent',
				generateComponent(CLASS_COMPONENT_TYPE)
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
			withTypeScript: true,
			withPropTypes: true,
			withConnect: true,
			withStyledComponents: true,
			withStorybook: true,
		})

	panel
		.webview
		.onDidReceiveMessage(function ({ data }) {
			onPanelSubmitted(data)
		})

	return panel
}

function generateComponent(type) {
	return function(uri) {
		const { fsPath } = uri;

		const panel = createConfigurationPanel(type, function (data) {
			const {
				componentName,
				useTypeScript,
				withConstructor,
				withPropTypes,
				withConnect,
				withStyledComponents,
				withStorybook,
			} = data

			panel.dispose()

			if (!componentName) {
				throw new Error('Component name should be filled');
			}

			const name = capitalize(componentName)

			const getFileName = (file) => `${file}.${useTypeScript ? 'ts' : 'js'}`
			const getComponentName = () => `component.${useTypeScript ? 'tsx' : 'jsx'}`

			if (createFolder(fsPath, name)) {
				if (type === FUNCTIONAL_COMPONENT_TYPE) {
					const fileType = useTypeScript
						? FUNCTIONAL_COMPONENT_TYPESCRIPT_TYPE
						: FUNCTIONAL_COMPONENT_TYPE
					createFile(fsPath, name, getComponentName(), fileType, {
						withConnect,
						withPropTypes,
					});
				} else if (type === CLASS_COMPONENT_TYPE) {
					const fileType = useTypeScript
						? CLASS_COMPONENT_TYPESCRIPT_TYPE
						: CLASS_COMPONENT_TYPE
					createFile(fsPath, name, getComponentName(), fileType, {
						withConstructor,
						withPropTypes,
						withConnect,
					});
				}

				createFile(fsPath, name, getFileName('index'), COMPONENT_INDEX_TYPE, {
					withConnect,
				});

				if (withStyledComponents) {
					createFile(fsPath, name, getFileName('styles'), STYLED_COMPONENT_STYLES_TYPE);
				}

				if (withConnect) {
					const fileType = useTypeScript
						? COMPONENT_CONTAINER_TYPESCRIPT_TYPE
						: COMPONENT_CONTAINER_TYPE
					createFile(fsPath, name, getFileName('container'), fileType);
				}

				if (withStorybook) {
					createFile(fsPath, name, getFileName('storiesx'), STORYBOOK_FILE_TYPE);
				}
			}
		})
	}
}

module.exports = {
	activate,
	deactivate
}
