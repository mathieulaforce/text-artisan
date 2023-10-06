export interface InputDataOptions {
  format: 'CSV' | 'JSON';
  options: CsvOptions | undefined;
}

export interface CsvOptions {
  containsHeaderRow: boolean;
  columnSeparator: string;
  rowSeparator: string;
}

export interface InputData {
  name: string;
  value: string;
}
