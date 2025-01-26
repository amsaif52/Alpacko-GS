/**
 * Displays the current configuration properties in a modal dialog.
 * 
 * This function retrieves script properties, passes them to an HTML template,
 * and then displays the template in a modal dialog within the Google Sheets UI.
 * 
 * The properties passed to the template include:
 * - primarySheet: The primary sheet name.
 * - poNumberColumn: The purchase order number column.
 * - nameColumn: The name column.
 * - qrCodeUrlColumn: The QR code URL column.
 * - etcColumn: The etc column.
 * - expectedQtyColumn: The expected quantity column.
 * - arrivalDateColumn: The arrival date column.
 * - customerColumn: The customer column.
 * - lengthColumn: The length column.
 * - breadthColumn: The breadth column.
 * - heightColumn: The height column.
 * - sheetWidthColumn: The sheet width column.
 * - sheetHeightColumn: The sheet height column.
 * - customerPoColumn: The customer purchase order column.
 * - deliveryDateColumn: The delivery date column.
 * - etcNumberConfirmationColumn: The etc number confirmation column.
 * - recQtyColumn: The received quantity column.
 * - inventoryColumn: The inventory column.
 * - totalInventoryColumn: The total inventory column.
 * - printColumn: The print column.
 * - cutColumn: The cut column.
 * - glueColumn: The glue column.
 * - damageColumn: The damage column.
 * - skidNumberColumn: The skid number column.
 * - updatedAtColumn: The updated at column.
 * 
 * The modal dialog is set to a width of 300 pixels and a height of 500 pixels,
 * with the title "Configuration Properties".
 */
function showCurrentConfiguration() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const properties = scriptProperties.getProperties();

  const template = HtmlService.createTemplateFromFile("CurrentConfig");

  // Passing properties to the template
  template.primarySheet = properties.primarySheet || "";
  template.poNumberColumn = properties.poNumberColumn|| "";
  template.nameColumn = properties.nameColumn|| "";
  template.qrCodeUrlColumn = properties.qrCodeUrlColumn|| "";
  template.etcColumn = properties.etcColumn|| "";
  template.expectedQtyColumn = properties.expectedQtyColumn|| "";
  template.arrivalDateColumn = properties.arrivalDateColumn|| "";
  template.customerColumn = properties.customerColumn|| "";
  template.lengthColumn = properties.lengthColumn|| "";
  template.breadthColumn = properties.breadthColumn|| "";
  template.heightColumn = properties.heightColumn|| "";
  template.sheetWidthColumn = properties.sheetWidthColumn|| "";
  template.sheetHeightColumn = properties.sheetHeightColumn|| "";
  template.customerPoColumn = properties.customerPoColumn|| "";
  template.deliveryDateColumn = properties.deliveryDateColumn|| "";
  template.etcNumberConfirmationColumn = properties.etcNumberConfirmationColumn|| "";
  template.recQtyColumn = properties.recQtyColumn|| "";
  template.inventoryColumn = properties.inventoryColumn|| "";
  template.totalInventoryColumn = properties.totalInventoryColumn|| "";
  template.printColumn = properties.printColumn|| "";
  template.cutColumn = properties.cutColumn|| "";
  template.glueColumn = properties.glueColumn|| "";
  template.damageColumn = properties.damageColumn|| "";
  template.skidNumberColumn = properties.skidNumberColumn|| "";
  template.updatedAtColumn = properties.updatedAtColumn|| "";

  const html = template
    .evaluate()
    .setWidth(300)
    .setHeight(500)
    .setTitle("Configuration Properties");

  SpreadsheetApp.getUi().showModalDialog(html, "Configuration Properties");
}
