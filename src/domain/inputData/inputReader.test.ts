import { describe, expect, it } from 'vitest';
import { CsvOptions } from './types';
import CsvInputReader from './inputReader';

describe('CsvInputReader', () => {
  const defaultCsvOptions: CsvOptions = {
    columnSeparator: ',',
    rowSeparator: '\n',
    containsHeaderRow: false,
  };

  describe('with header', () => {
    const headerRow = 'First, Second, Third';
    const content = 'A, B, C\nD,E,F';
    const input = `${headerRow}\n${content}`;

    it('should count 2 rows and 3 columns', () => {
      const csvReader = new CsvInputReader();
      const result = csvReader.read(input, { ...defaultCsvOptions, containsHeaderRow: true });
      expect(result.numberOfRows).toBe(2);
      expect(result.numberOfColumns).toBe(3);
    });

    it('should return all rows of the index column 1 ', () => {
      const csvReader = new CsvInputReader();
      const result = csvReader.read(input, { ...defaultCsvOptions, containsHeaderRow: true }).getColumnValuesByIndex(1);

      const expected = { index: 1, name: 'Second', rows: [{ value: 'B' }, { value: 'E' }] };
      expect(result).toEqual(expected);
    });

    it('should return nothing when index does not exist ', () => {
      const csvReader = new CsvInputReader();
      const result = csvReader.read(input, { ...defaultCsvOptions, containsHeaderRow: true }).getColumnValuesByIndex(10);

      expect(result).toBeUndefined();
    });

    it('should return all rows of the Second column values ', () => {
      const csvReader = new CsvInputReader();
      const result = csvReader.read(input, { ...defaultCsvOptions, containsHeaderRow: true }).getColumnValuesByName('Second');

      const expected = { index: 1, name: 'Second', rows: [{ value: 'B' }, { value: 'E' }] };
      expect(result).toEqual(expected);
    });

    it('should return nothing when column name does not exist ', () => {
      const csvReader = new CsvInputReader();
      const result = csvReader.read(input, { ...defaultCsvOptions, containsHeaderRow: true }).getColumnValuesByName('negative first');
      expect(result).toBeUndefined();
    });
  });

  describe('without header', () => {
    const content = 'A, B, C\nD,E,F';
    const input = `${content}`;

    it('should count 2 rows and 3 columns', () => {
      const csvReader = new CsvInputReader();
      const result = csvReader.read(input, { ...defaultCsvOptions });
      expect(result.numberOfRows).toBe(2);
      expect(result.numberOfColumns).toBe(3);
    });

    it('should return all rows of the index column 1 ', () => {
      const csvReader = new CsvInputReader();
      const result = csvReader.read(input, { ...defaultCsvOptions }).getColumnValuesByIndex(1);

      const expected = { index: 1, name: '1', rows: [{ value: 'B' }, { value: 'E' }] };
      expect(result).toEqual(expected);
    });

    it('should return nothing when index does not exist ', () => {
      const csvReader = new CsvInputReader();
      const result = csvReader.read(input, { ...defaultCsvOptions }).getColumnValuesByIndex(10);

      expect(result).toBeUndefined();
    });

    it('should be empty when get column value by name ', () => {
      const csvReader = new CsvInputReader();
      const result = csvReader.read(input, { ...defaultCsvOptions }).getColumnValuesByName('Second');
      expect(result).toBeUndefined();
    });
  });
});
