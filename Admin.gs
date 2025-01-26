/**
 * Adds a custom menu named "QR Codes" to the Google Sheets UI when the spreadsheet is opened.
 * The menu contains an item "Create QR Codes" which triggers the `createQrCodes` function.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Create a custom menu
  ui.createMenu('QR Codes')
    .addItem('Create QR Codes', 'createQrCodes')
    .addToUi();
}
