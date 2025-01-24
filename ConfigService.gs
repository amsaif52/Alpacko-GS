function saveColumnSettings(settings) {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperties({
    poNumberColumn : settings.poNumberColumn.trim(),
    nameColumn : settings.nameColumn.trim(),
    qrCodeUrlColumn : settings.qrCodeUrlColumn.trim(),
    etcColumn : settings.etcColumn.trim(),
    expectedQtyColumn : settings.expectedQtyColumn.trim(),
    arrivalDateColumn : settings.arrivalDateColumn.trim(),
    customerColumn : settings.customerColumn.trim(),
    lengthColumn : settings.lengthColumn.trim(),
    breadthColumn : settings.breadthColumn.trim(),
    heightColumn : settings.heightColumn.trim(),
    sheetWidthColumn : settings.sheetWidthColumn.trim(),
    sheetHeightColumn : settings.sheetHeightColumn.trim(),
    customerPoColumn : settings.customerPoColumn.trim(),
    deliveryDateColumn : settings.deliveryDateColumn.trim(),
    etcNumberConfirmationColumn : settings.etcNumberConfirmationColumn.trim(),
    recQtyColumn : settings.recQtyColumn.trim(),
    inventoryColumn : settings.inventoryColumn.trim(),
    totalInventoryColumn : settings.totalInventoryColumn.trim(),
    printColumn : settings.printColumn.trim(),
    cutColumn : settings.cutColumn.trim(),
    glueColumn : settings.glueColumn.trim(),
    damageColumn : settings.damageColumn.trim(),
    skidNumberColumn : settings.skidNumberColumn.trim(),
    updatedAtColumn : settings.updatedAtColumn.trim(),
  });
}

function getSheetNamesAndPrimarySheet() {
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  const sheetNames = sheets.map((sheet) => sheet.getName());
  const primarySheet =
    PropertiesService.getScriptProperties().getProperty("primarySheet");

  return {
    sheetNamesJson: JSON.stringify(sheetNames),
    primarySheet: primarySheet,
  };
}

// Save selected sheet name as a script property
function savePrimarySheet(sheetName) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("primarySheet", sheetName);
}

function getConfiguration() {
  // Retrieve all script properties
  const scriptProperties =
    PropertiesService.getScriptProperties().getProperties();
  // You could directly return scriptProperties if it contains only the configuration
  // However, it's a good practice to explicitly construct your configuration object
  // This ensures only the expected properties are included and allows for default values
  const configData = {
    poNumberColumn : scriptProperties.poNumberColumn || "",
    nameColumn : scriptProperties.nameColumn || "",
    qrCodeUrlColumn : scriptProperties.qrCodeUrlColumn || "",
    etcColumn : scriptProperties.etcColumn || "",
    expectedQtyColumn : scriptProperties.expectedQtyColumn || "",
    arrivalDateColumn : scriptProperties.arrivalDateColumn || "",
    customerColumn : scriptProperties.customerColumn || "",
    lengthColumn : scriptProperties.lengthColumn || "",
    breadthColumn : scriptProperties.breadthColumn || "",
    heightColumn : scriptProperties.heightColumn || "",
    sheetWidthColumn : scriptProperties.sheetWidthColumn || "",
    sheetHeightColumn : scriptProperties.sheetHeightColumn || "",
    customerPoColumn : scriptProperties.customerPoColumn || "",
    deliveryDateColumn : scriptProperties.deliveryDateColumn || "",
    etcNumberConfirmationColumn : scriptProperties.etcNumberConfirmationColumn || "",
    recQtyColumn : scriptProperties.recQtyColumn || "",
    inventoryColumn : scriptProperties.inventoryColumn || "",
    totalInventoryColumn : scriptProperties.totalInventoryColumn || "",
    printColumn : scriptProperties.printColumn || "",
    cutColumn : scriptProperties.cutColumn || "",
    glueColumn : scriptProperties.glueColumn || "",
    damageColumn : scriptProperties.damageColumn || "",
    skidNumberColumn : scriptProperties.skidNumberColumn || "",
    updatedAtColumn : scriptProperties.updatedAtColumn || "",
  };

  return configData;
}

function savePrimarySheet(sheetName) {
  PropertiesService.getScriptProperties().setProperty(
    "primarySheet",
    sheetName,
  );
}
