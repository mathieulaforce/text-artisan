import CsvDataTable, { DataColumn } from '../csvDataTable';
import CsvInputReader from '../inputData/inputReader';
import { PatternMatcher } from '../pattern/patternMatcher';
import type { PatternOptions } from '../pattern/patternMatcher';
import type { CsvOptions } from '../inputData/types';

export class OutputCalculator {
  private readonly patternMatcher: PatternMatcher;
  private readonly inputReader: CsvInputReader;

  private inputDataEntries: CsvDataTable;

  constructor(patternMatcher: PatternMatcher, inputReader: CsvInputReader) {
    this.patternMatcher = patternMatcher;
    this.inputReader = inputReader;
    this.inputDataEntries = new CsvDataTable();
  }

  setPatternInformation(pattern: string, options: PatternOptions) {
    if (!pattern || !options?.prefix || !options.suffix) {
      this.patternMatcher.reset();
    }
    this.patternMatcher.preparePatternMatch(pattern, options);
  }

  setInputInformation(input: string, options: CsvOptions) {
    if (!input || !options?.columnSeparator || !options.rowSeparator) {
      this.inputDataEntries = new CsvDataTable();
      return;
    }
    this.inputDataEntries = this.inputReader.read(input, options);
  }

  generate() {
    if (this.inputDataEntries.isEmpty()) {
      return '';
    }

    let outputEntries: Array<string> = Array(this.inputDataEntries.numberOfRows).fill(this.patternMatcher.pattern);
    if (this.patternMatcher.containsMatches()) {
      outputEntries = this.generatePattern(outputEntries);
    }
    return outputEntries.join('\n');
  }

  private generatePattern(outputEntries: Array<string>) {
    const unwrappedInputs = this.patternMatcher.getUnwrappedMatchedNames();

    unwrappedInputs.forEach((nameOrIndex) => {
      const index = Number(nameOrIndex);
      let data: {
        column: DataColumn | undefined;
        useIndex: boolean;
      };

      if (isNaN(index)) {
        data = {
          column: this.inputDataEntries.getColumnValuesByName(nameOrIndex),
          useIndex: false,
        };
      } else {
        data = {
          column: this.inputDataEntries.getColumnValuesByIndex(index),
          useIndex: true,
        };
        if (!data.column) {
          //edge case, if someone uses a number as a name, but the index does not exist
          data = {
            column: this.inputDataEntries.getColumnValuesByName(nameOrIndex),
            useIndex: false,
          };
        }
      }
      if (!data.column) {
        if (this.patternMatcher.isKeyword(nameOrIndex)) {
          outputEntries.forEach((_, rowIndex) => {
            outputEntries[rowIndex] = this.patternMatcher.replaceKeywords(outputEntries[rowIndex], nameOrIndex, rowIndex, this.inputDataEntries);
          });
        }
        return;
      }

      const name = data.useIndex ? data.column.index.toString() : data.column.name.toString();
      const rows = data.column.rows;

      outputEntries.forEach((_, rowIndex) => {
        outputEntries[rowIndex] = this.patternMatcher.replacePlaceholder(outputEntries[rowIndex], name, rows[rowIndex].value);
      });
    });

    return outputEntries;
  }
}
