class Plan {
  copy () {
    return Object.assign(new Plan(), this);
  }
  setLimit (amount) {
    this._amount = amount;
  }
  withinLimit (rows) {
    if (!this.hasOwnProperty('_amount')) return true;
    return rows.length < this._amount;
  }
  setSelected (columns) {
    if (columns.includes('*')) {
      delete this._columns;
    } else {
      this._columns = columns;
    }
  }
  selectColumns (row) {
    if (!this.hasOwnProperty('_columns')) return row;
    const selectedRow = {};
    for (const column of this._columns) {
      selectedRow[column] = row[column];
    }
    return selectedRow;
  }
  setCriteria (criteria) {
    this._criteria = criteria;
  }
  matchesRow (row) {
    if (!this.hasOwnProperty('_criteria')) return true;
    return Object.keys(this._criteria).every(column => {
      const cond = this._criteria[column];
      const cellValue = row[column];
      if (typeof cond === 'function') {
        return cond(cellValue);
      } else {
        return cellValue === cond;
      }
    });
  }
  getInitialRowIds (table) {
    if (!this.hasOwnProperty('_criteria')) return table.getRowIds();
    const indexedCriteria = {};
    const nonIndexedCriteria = {};
    for (const column of Object.keys(this._criteria)) {
      if (table.hasIndexTable(column)) {
        indexedCriteria[column] = this._criteria[column];
      } else {
        nonIndexedCriteria[column] = this._criteria[column];
      }
    }
    if (Object.keys(indexedCriteria).length === 0) return table.getRowIds();
    this._criteria = nonIndexedCriteria;
    return Object.keys(indexedCriteria)
    .map(indexedColumn => {
      const indexTable = table.getIndexTable(indexedColumn);
      const indexKey = indexedCriteria[indexedColumn];
      return indexTable[indexKey];
    })
    .reduce((rowIds, moreRowIds) => {
      const intersectedIds = rowIds.filter(id => {
        return moreRowIds.includes(id);
      });
      return intersectedIds;
    });
  }
}

module.exports = Plan;
