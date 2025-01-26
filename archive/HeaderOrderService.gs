function getHeadersFromPrimarySheet() {
  const properties = PropertiesService.getScriptProperties();
  const storedHeaderOrder = properties.getProperty("headerOrder");
  // Check if storedHeaderOrder exists and is not empty
  if (storedHeaderOrder) {
    try {
      // Attempt to parse the stored JSON string
      const headerOrder = JSON.parse(storedHeaderOrder);

      // If parsing was successful and result is an array with at least one element
      if (Array.isArray(headerOrder) && headerOrder.length > 0) {
        return headerOrder;
      }
    } catch (e) {
      // In case of any errors during parsing, log the error and proceed to load headers from the sheet
      console.error("Error parsing stored headerOrder: ", e);
    }
  }

  // If storedHeaderOrder does not exist, or parsing failed, load headers from the sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Config.mainSheet,
  );
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers;
}

function saveHeaderOrder(order) {
  const properties = PropertiesService.getScriptProperties();
  properties.setProperty("headerOrder", JSON.stringify(order));
}

function getOriginalHeaderOrder() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Config.mainSheet,
  );
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers;
}
