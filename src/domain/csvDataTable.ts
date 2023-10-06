import NameValueCollection from '../utils/nameValueCollection';

class CsvDataTable {
  private columns = new NameValueCollection<DataColumn>();
  private maxColumnsCount: number = 0;
  private rowCount: number = 0;
  private headers = new NameValueCollection<string>();

  constructor() {}

  public get numberOfRows(): number {
    return this.rowCount;
  }
  public get numberOfColumns(): number {
    return this.maxColumnsCount;
  }

  clear() {
    this.headers.clear();
    this.columns.clear();
    this.rowCount = 0;
    this.maxColumnsCount = 0;
  }

  isEmpty() {
    return this.rowCount == 0;
  }

  getHeadernameByIndex(index: number) {
    return this.headers.getItemByIndex(index);
  }

  registerHeaders(headerLine: string, separator: string) {
    headerLine.split(separator).forEach((header, index) => {
      header = header.trim();
      this.headers.addItem(header, header);
      const column = this.columns.getItemByIndex(index);
      if (column) {
        this.columns.removeItemByName(column.name);
        column.name = header;
        this.columns.addItem(header, column);
      } else {
        this.columns.addItem(header, {
          index,
          name: header,
          rows: [],
        });
      }
    });
    this.updateNumberOfColumns(this.headers.length);
  }

  addRows(lines: string[], separator: string) {
    lines.forEach((line) => {
      const columns = line.split(separator);
      this.updateNumberOfColumns(this.columns.length);

      this.addRow(columns);
    });
  }

  getColumnValuesByIndex(index: number) {
    return this.columns.getItemByIndex(index);
  }

  getColumnValuesByName(columnName: string /*, sensitivity?: 'base' | 'accent' | 'case' | 'variant' | undefined */) {
    if (!this.headers) {
      throw new Error('No header specified, cannot find values by name');
    }
    return this.columns.getItemByName(columnName);
    // const index = this.headers.findIndex((header) => !header.localeCompare(columnName, undefined, { sensitivity }));
    // return this.columns[index];
  }

  private addRow(columns: string[]) {
    const largestColumnIndex = columns.length > this.numberOfColumns ? columns.length : this.numberOfColumns;
    for (let columnIndex = 0; columnIndex < largestColumnIndex; columnIndex++) {
      const column = columns[columnIndex];
      const existingColumn = this.columns.getItemByIndex(columnIndex);
      if (existingColumn) {
        existingColumn.rows.push({
          value: column?.trim() ?? '',
        });
      } else {
        const rows = Array(this.rowCount).fill({ value: '' });
        rows.push({ value: column.trim() });
        this.columns.addItem(columnIndex.toString(), {
          index: columnIndex,
          name: columnIndex.toString(),
          rows: rows,
        });
      }
    }

    this.rowCount++;
    this.updateNumberOfColumns(largestColumnIndex);
  }

  private updateNumberOfColumns(numberOfColumns: number) {
    if (this.maxColumnsCount < numberOfColumns) {
      this.maxColumnsCount = numberOfColumns;

      this.columns.forEach((col) => {
        const rowsToAdd = this.rowCount - col.rows.length;
        for (let index = 0; index < rowsToAdd; index++) {
          col.rows.push({
            value: '',
          });
        }
      });
    }
  }
}

export interface DataRow {
  value: string;
}

export interface DataColumn {
  index: number;
  name: string;
  rows: DataRow[];
}
export default CsvDataTable;
