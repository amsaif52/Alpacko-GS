function getCarouselData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Config.mainSheet,
  );
  const properties = PropertiesService.getScriptProperties();
  const storedHeaderOrder = properties.getProperty("headerOrder");
  let headersOrder = [];
  // Attempt to use stored header order if available
  if (storedHeaderOrder) {
    try {
      headersOrder = JSON.parse(storedHeaderOrder);
    } catch (e) {
      console.error("Failed to parse storedHeaderOrder:", e);
    }
  }

  const [headers, ...rows] = sheet.getDataRange().getValues();
  let sortedHeaders = headers;

  // If we have a valid headersOrder, sort the headers accordingly
  if (headersOrder.length > 0) {
    sortedHeaders = headersOrder
      .map((headerName) => {
        // Find the index of this header in the original headers array
        const index = headers.indexOf(headerName);
        return headers[index]; // Return the header name, preserving the order in headersOrder
      })
      .filter((header) => header !== undefined); // Filter out any headers not found in the original headers
  }

  // Convert data to a format suitable for serialization, respecting sortedHeaders
  const finalCarouselData = rows.map((row) => {
    return sortedHeaders.reduce((obj, header, index) => {
      let value = row[headers.indexOf(header)]; // Use the original headers array to match column data
      // Check for Date objects and convert them to a string
      if (value instanceof Date) {
        value = Utilities.formatDate(
          value,
          Session.getScriptTimeZone(),
          "yyyy-MM-dd'T'HH:mm:ss'Z'",
        );
      }
      // Ensure other types are handled correctly (e.g., numbers, strings, booleans)
      obj[header] = value;
      return obj;
    }, {});
  });
  return { finalCarouselData, headersOrder };
}