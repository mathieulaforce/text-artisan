import CsvDataTable from '../csvDataTable';
import { CsvOptions } from './types';

export interface InputReader {
  read: (input: string) => CsvDataTable;
}

class CsvInputReader {
  public read(input: string, options: CsvOptions) {
    const table = new CsvDataTable();
    if (!input) {
      return table;
    }
    let rows = input.split(options.rowSeparator);

    if (!rows.length) {
      return table;
    }

    if (options.containsHeaderRow) {
      const header = rows.shift();
      if (header) {
        table.registerHeaders(header, options.columnSeparator);
      }
    }

    table.addRows(rows, options.columnSeparator);
    return table;
  }
}

export default CsvInputReader;
