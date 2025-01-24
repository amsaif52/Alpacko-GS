function showCurrentConfiguration() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const properties = scriptProperties.getProperties();

  const template = HtmlService.createTemplateFromFile("CurrentConfig");

  // Passing properties to the template
  template.primarySheet = properties.primarySheet || "";
  template.poNumberColumn = properties.poNumberColumn || "";
  template.nameColumn = properties.nameColumn || "";
  template.qrCodeUrlColumn = properties.qrCodeUrlColumn || "";
  template.etcNumberConfirmationColumn = properties.etcNumberConfirmationColumn || "";
  template.recQtyColumn = properties.recQtyColumn || "";
  template.inventoryColumn = properties.inventoryColumn || "";
  template.printColumn = properties.printColumn || "";
  template.cutColumn = properties.cutColumn || "";
  template.glueColumn = properties.glueColumn || "";
  template.damageColumn = properties.damageColumn || "";
  template.skidNumberColumn = properties.skidNumberColumn || "";
  template.updatedAtColumn = properties.updatedAtColumn || "";

  const html = template
    .evaluate()
    .setWidth(300)
    .setHeight(500)
    .setTitle("Configuration Properties");

  SpreadsheetApp.getUi().showModalDialog(html, "Configuration Properties");
}
