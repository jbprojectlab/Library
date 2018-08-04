const fs = require('fs');
const path = require('path');

class Table {
  constructor (folderPath) {
    this._folderPath = folderPath;
    this._allIndexTables = {};
  }
  static toFilename (id) {
    return id + '.json';
  }
  static toId (filename) {
    return filename.slice(0, -5);
  }
  read (id) {
    const filepath = path.join(this._folderPath, Table.toFilename(id));
    if (!fs.existsSync(filepath)) return undefined;
    const fileContents = fs.readFileSync(filepath);
    const rowData = JSON.parse(fileContents);
    return rowData;
  }
  getRowIds () {
    const filenames = fs.readdirSync(this._folderPath);
    const ids = filenames.map(Table.toId);
    return ids;
  }
  addIndexTable (column) {
    const indexTable = {};
    for (const id of this.getRowIds()) {
      const row = this.read(id);
      const indexKey = row[column];
      if (!indexTable.hasOwnProperty(indexKey)) {
        indexTable[indexKey] = [id];
      } else {
        indexTable[indexKey].push(id);
      }
    }
    this._allIndexTables[column] = indexTable;
  }
  hasIndexTable (column) {
    return this._allIndexTables.hasOwnProperty(column);
  }
  getIndexTable (column) {
    return this._allIndexTables[column];
  }
}

module.exports = Table;
