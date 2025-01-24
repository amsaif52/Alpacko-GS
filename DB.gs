class Database {
  constructor() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    this.sheet = ss.getSheetByName(Config.dbSheet);
  }

  // Create a new row
  create(id, oldValue, value, date) {
    this.sheet.appendRow([id, oldValue, value, date]);
  }

  // Read data
  read() {
    return this.sheet.getDataRange().getValues();
  }

  // Update a row by ID
  update(id, newValue, newDate, newType, oldValue) {
    const data = this.sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === id) {
        this.sheet
          .getRange(i + 1, 2, 1, 3)
          .setValues([[newValue, oldValue, newDate, newType]]);
        break;
      }
    }
  }

  // Delete a row by ID
  deleteById(id) {
    const data = this.sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === id) {
        this.sheet.deleteRow(i + 1);
        break;
      }
    }
  }

  // Get the latest row by date for a given ID
  getLatestById(id) {
    const data = this.sheet.getDataRange().getValues();
    let latest = null;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === id) {
        if (!latest || new Date(data[i][2]) > new Date(latest[2])) {
          latest = [
            data[i][0],
            data[i][1],
            new Date(data[i][2])?.toString(),
            data[i][3],
            data[i][4]
          ];
        }
      }
    }
    return latest;
  }
}

const db = new Database("Transaction");
