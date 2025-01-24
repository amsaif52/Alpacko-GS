function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Create a custom menu
  ui.createMenu('QR Codes')
    .addItem('Create QR Codes', 'createQrCodes')
    .addToUi();

  ui.createMenu('Configuration')
  .addItem('Set Configuration', 'showColumnsConfigurationDialog')
  .addItem('Show Configuration', 'showCurrentConfiguration')
  .addItem('Set Catalog Order', 'showCatalogOrder')

    .addToUi();

}
