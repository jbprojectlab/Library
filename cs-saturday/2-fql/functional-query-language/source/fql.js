const Plan = require('./plan');

class FQL {
  constructor (table, plan = new Plan()) {
    this._table = table;
    this._plan = plan;
  }
  copy () {
    return new FQL(this._table, this._plan.copy());
  }
  get () {
    const rows = [];
    const rowIds = this._plan.getInitialRowIds(this._table);
    for (const id of rowIds) {
      if (!this._plan.withinLimit(rows)) break;
      const row = this._table.read(id);
      if (this._plan.matchesRow(row)) {
        const selectedRow = this._plan.selectColumns(row);
        rows.push(selectedRow);
      }
    }
    return rows;
  }
  count () {
    return this.get().length;
  }
  limit (amount) {
    const newQuery = this.copy();
    newQuery._plan.setLimit(amount);
    return newQuery;
  }
  select (...columns) {
    const newQuery = this.copy();
    newQuery._plan.setSelected(columns);
    return newQuery;
  }
  where (criteria) {
    const newQuery = this.copy();
    newQuery._plan.setCriteria(criteria);
    return newQuery;
  }
}

module.exports = FQL;
