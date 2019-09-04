module.exports = function (target) {
  return `
<script>
  const submitButton = document.getElementById('submitButton')
  const componentNameInput = document.getElementById('componentName')

  submitButton.onclick = handleSubmit

  componentNameInput.oninput = function({ target: { value }}) {
    validateInputs(value)
  }

  function validateInputs (value) {
    if (!value && submitButton) {
      submitButton.disabled = true
    }

    if (value && submitButton) {
      submitButton.disabled = false
    }
  }
  
  function handleSubmit () {
    const componentNameElement = document.getElementById('componentName')
    const generateConstructorElement = document.getElementById('generateConstructor')
    const generatePropTypesElement = document.getElementById('generatePropTypes')
    const generateConnectElement = document.getElementById('generateConnect')
    const generateStyledComponentsElement = document.getElementById('generateStyledComponents')
    
    const settings = {
      componentName: componentNameElement.value,
      withConstructor: generateConstructorElement && generateConstructorElement.checked,
      withPropTypes: generatePropTypesElement && generatePropTypesElement.checked,
      withConnect: generateConnectElement && generateConnectElement.checked,
      withStyledComponents: generateStyledComponents && generateStyledComponents.checked,
    }
    
    acquireVsCodeApi().postMessage({
      command: 'CREATE_CONFIGURED',
      target: '${target}',
      data: settings,
    })
  }

  validateInputs()

</script>
  `
}
