module.exports = function () {
  return `
<style>
  .field-group, .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 8px;
  }

  .field-group label {
    min-width: 200px;
  }
  
  .field-group input {
    margin: 0;
    padding: 0;
  }
  
  .actions button {
    margin-right: 8px;
  }
  
  .action button:last-child {
    margin-right: 0;
  }
</style>
  `
}
