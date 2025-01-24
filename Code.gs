// config/ global vars
const Config = {
  mainSheet: PropertiesService.getScriptProperties().getProperty("primarySheet"),
  dbSheet: "Transaction",
};

function doGet() {
  return HtmlService.createTemplateFromFile("App").evaluate();
}

function generateQRCode(data) {
  const url =
    "https://quickchart.io/chart?cht=qr&chs=150x150&chl=" +
    // "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" +
    encodeURIComponent(data);
  return url;
}

const generateUUID = () => {
  let d = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    r = (d + r) % 16 | 0;
    d = Math.floor(d / 16);

    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

function createQrCodes() {
  if (checkDuplicates()) {
    return;
  }

  if (!areAllPropertiesFilled()) {
    SpreadsheetApp.getUi().alert(
      "Operation halted due to incomplete configuration.",
    );
    return;
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Config.mainSheet,
  );
  const lastRow = sheet.getLastRow();

  // Retrieve all values in the poNumberColumn and qrCodeUrlColumn at once
  const idValues = sheet
    .getRange(2, columnNumberGetter("poNumberColumn"), lastRow - 1)
    .getValues();
    console.log('id column ', columnNumberGetter("poNumberColumn"))
    console.log('idValues ', idValues)
  const qrCodeUrlValues = sheet
    .getRange(2, columnNumberGetter("qrCodeUrlColumn"), lastRow - 1)
    .getValues();

  // Array to hold the data to be written back
  let dataToWrite = [];

  // Process each row
  for (let i = 0; i < lastRow-1; i++) {
    if (!qrCodeUrlValues[i][0] && idValues[i][0]) {
      const uuid = generateUUID();
      console.log('idValues[i][0] ', idValues[i][0])
      const code = idValues[i][0] || uuid
      const qrCode = generateQRCode(code);
      const row = i + 1;
      // Set the UUID and QR code in the respective columns
      sheet.getRange(row+1, columnNumberGetter("poNumberColumn")).setValue(code); // Set uuid Code in Column
      sheet.getRange(row+1, columnNumberGetter("qrCodeUrlColumn")).setValue(qrCode); // Set QR Code in Column
    }
  }
}

// function activateCard(id, newValue) {
//   // Write to Transaction
//   const rowIndex = searchSheetForRowIndex(id);
//   if (!rowIndex) {
//     return { status: "error", payload: [], message: "Can't find id" };
//   }

//   const ss = SpreadsheetApp.getActiveSpreadsheet();
//   const mainSheet = ss.getSheetByName(Config.mainSheet);
//   const mainData = mainSheet.getDataRange().getValues();
//   const activatedAt = new Date();

//   for (let i = 0; i < mainData.length; i++) {
//     if (mainData[i][0] === id) {
//       mainSheet.getRange(i + 1, 6).setValue(activatedAt);
//       break;
//     }
//   }

//   const db = new Database("Transaction");
//   // Create a row
//   // [id, value, date, type]

//   db.create(id, newValue, activatedAt);
//   return { status: "success", payload: [id, newValue, activatedAt] };
// }

function addTransaction(rowData, newValue) {
  const id = rowData[0];
  const [_, oldValue] = searchPrimarySheet(id);
  // Write to Transaction
  const db = new Database("Transaction");
  // row, ID	Value	Date	Type
  // const [rowIndex, idInCol, oldValue, date, type] = db.getLatestById(id);
  // if (!latest) {
  //   return {status: 'error', payload: [], message: "Can't find id"}
  // }

  // if (!rowIndex) {
  //   return {status: 'error', payload: []}
  // }
  const updatedAt = new Date();
  // Create a row
  // [id, value, date, type]
  db.create(id, oldValue || 0, JSON.stringify(newValue), updatedAt);

  // Update the primary data sheet
  updateCellValueById(id, newValue);

  return [id, newValue, new Date(updatedAt)?.toLocaleDateString()];
}

function updateCellValueById(id, newValue) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(Config.mainSheet);
  const lastRow = sheet.getLastRow();

  const columnRange = sheet.getRange(1, columnNumberGetter("poNumberColumn"), lastRow);
  const columnValues = columnRange.getValues();

  for (let i = 1; i < columnValues.length; i++) {
    if (columnValues[i][0] === id) {
      const rowToUpdate = i + 1;
      console.log(sheet
        .getRange(rowToUpdate, columnNumberGetter("printColumn")))
      sheet
        .getRange(rowToUpdate, columnNumberGetter("printColumn"))
        .setValue(newValue?.printCheck ? 1 : 0);
      sheet
        .getRange(rowToUpdate, columnNumberGetter("cutColumn"))
        .setValue(newValue?.cutCheck ? 1 : 0);
      sheet
        .getRange(rowToUpdate, columnNumberGetter("glueColumn"))
        .setValue(newValue?.glueCheck ? 1 : 0);
      sheet
        .getRange(rowToUpdate, columnNumberGetter("updatedAtColumn"))
        .setValue(new Date());
      break;
    }
  }
}

function getLatestDataById(id) {}

const searchPrimarySheet = (url) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Config.mainSheet,
  );
  const data = sheet.getDataRange().getValues();
  console.log('data ', data)
  const columnIndex = columnNumberGetter("poNumberColumn")-1;
  // const db = new Database('Transaction');
  // return db.getLatestById(id); // This is for relational db style saving
  for (let i = 1; i < data.length; i++) {
    console.log('data[i][columnIndex] ', data[i][columnIndex])
    console.log('url ', url)
    if (data[i][columnIndex] === url) {
      // Return a simplified array or object
      return [
        data[i][columnNumberGetter("poNumberColumn")-1],
        data[i][columnNumberGetter("nameColumn")-1],
        data[i][columnNumberGetter("etcNumberConfirmationColumn")-1],
        data[i][columnNumberGetter("recQtyColumn")-1],
        data[i][columnNumberGetter("inventoryColumn")-1],
        data[i][columnNumberGetter("printColumn")-1],
        data[i][columnNumberGetter("cutColumn")-1],
        data[i][columnNumberGetter("glueColumn")-1],
        data[i][columnNumberGetter("skidNumberColumn")-1],
        data[i][columnNumberGetter("updatedAtColumn")-1] ? new Date(data[i][columnNumberGetter("updatedAtColumn")-1]).toLocaleDateString() : "N/A",
      ];
    }
  }
  return [];
};

const searchSheetForUrlActivate = (qrData) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Config.mainSheet,
  );
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === qrData) {
      // Change values here depending on which columns you want to return
      // TODO make this a config
      // Currently returns batch id, quantity, last updateat
      return [
        data[i][columnNumberGetter("poNumberColumn")-1],
        data[i][columnNumberGetter("recQtyColumn")-1],
        data[i][columnNumberGetter("updatedAtColumn")-1] ? new Date( data[i][columnNumberGetter("updatedAtColumn")-1]).toLocaleDateString() : "N/A",
      ];
    }
  }
  return null;
};

// TODO modify to use script properties
const searchSheetForRowIndex = (id) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Config.mainSheet,
  );
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      return i + 1;
    }
  }
  return;
};

const updateSheetValue = (id, newValues) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mainSheet = ss.getSheetByName(Config.mainSheet);
  const activitySheet = ss.getSheetByName(Config.mainSheet);
  const mainData = mainSheet.getDataRange().getValues();

  for (let i = 0; i < mainData.length; i++) {
    if (mainData[i][0] === uuid) {
      mainSheet.getRange(i + 1, 1, 1, newValues.length).setValues([newValues]);
      break;
    }
  }

  activitySheet.appendRow([uuid, newValue, new Date(), Config.mainSheet]);
};

function checkDuplicates() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Config.mainSheet,
  );
  const columnLetter = columnScriptPropertyGetter("poNumberColumn");
  const column = sheet
    .getRange(`${columnLetter}2:${columnLetter}${sheet.getLastRow()}`)
    .getValues();
  const duplicates = new Map();
  const spacesFound = new Map();
  const uniqueValues = new Map();

  column.forEach((cell, i) => {
    const value = cell[0];
    const rowIndex = i + 2; // Adjust for array index and starting from row 2
    if (value === "") return; // Skip blank rows

    // Check for spaces
    /*if (value.includes(" ")) {
      if (spacesFound.has(value)) {
        spacesFound.get(value).push(rowIndex);
      } else {
        spacesFound.set(value, [rowIndex]);
      }
    }*/

    // Check for duplicates
    if (uniqueValues.has(value)) {
      if (duplicates.has(value)) {
        duplicates.get(value).push(rowIndex);
      } else {
        duplicates.set(value, [uniqueValues.get(value), rowIndex]);
      }
    } else {
      uniqueValues.set(value, rowIndex);
    }
  });

  let alertMessage = "";

  // Prepare message for spaces found
  if (spacesFound.size > 0) {
    let spacesMessage = "Spaces not allowed. Spaces found:\n";
    spacesFound.forEach((rows, value) => {
      spacesMessage += `${value} - rows: ${rows.join(", ")}\n`;
    });
    alertMessage += spacesMessage + "\n"; // Append spaces message to the alert message
  }

  // Prepare message for duplicates found
  if (duplicates.size > 0) {
    let duplicatesMessage = "Duplicates found:\n";
    duplicates.forEach((rows, value) => {
      duplicatesMessage += `${value} - rows: ${rows.join(", ")}\n`;
    });
    alertMessage += duplicatesMessage;
  }

  // Show alert based on what was found
  if (spacesFound.size > 0 || duplicates.size > 0) {
    SpreadsheetApp.getUi().alert(alertMessage);

    return true;
  }

  return false;
}

function showColumnsConfigurationDialog() {
  const html = HtmlService.createHtmlOutputFromFile("Config")
    .setWidth(400)
    .setHeight(600);
  html.append(HtmlService.createHtmlOutputFromFile("ConfigStyle").getContent());
  SpreadsheetApp.getUi().showModalDialog(html, "Configuration");
}

function showCatalogOrder() {
  const html = HtmlService.createHtmlOutputFromFile("HeaderOrder")
    .setWidth(500) // Set the width of the modal
    .setHeight(800); // Set the height of the modal
  SpreadsheetApp.getUi() // Get the UI object
    .showModalDialog(html, "Set Catalog Order"); // Show the modal
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Utility functions

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// Function to convert a column letter (uppercase or lowercase) to its corresponding index (e.g., 'A' or 'a' => 1, 'B' => 2)
function columnLetterToIndex(letter) {
  let column = 0;
  // Convert the letter to uppercase to handle lowercase inputs
  const uppercaseLetter = letter.toUpperCase();
  const length = uppercaseLetter.length;
  for (let i = 0; i < length; i++) {
    column +=
      (uppercaseLetter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

function areAllPropertiesFilled() {
  // Retrieve script properties
  const scriptProperties = PropertiesService.getScriptProperties();
  const properties = scriptProperties.getProperties();

  // List of required property keys
  const requiredProperties = [
    "poNumberColumn",
    "nameColumn",
    "qrCodeUrlColumn",
    "etcNumberConfirmationColumn",
    "recQtyColumn",
    "inventoryColumn",
    "printColumn",
    "cutColumn",
    "glueColumn",
    "damageColumn",
    "skidNumberColumn",
    "updatedAtColumn",
  ];

  // Check if all required properties are filled
  const allFilled = requiredProperties.every(
    (prop) => properties[prop] && properties[prop].trim() !== "",
  );

  // Show modal dialog with the result
  const ui = SpreadsheetApp.getUi();
  if (allFilled) {
    return true;
  } else {
    return false;
  }
}

function columnScriptPropertyGetter(propertyName) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const columnLetter = scriptProperties.getProperty(propertyName);

  return columnLetter;
}

function columnNumberGetter(propertyName) {
  const columnLetter = columnScriptPropertyGetter(propertyName);

  // Convert the column letters to numerical indices
  const columnNumber = columnLetterToIndex(columnLetter);

  return columnNumber;
}
