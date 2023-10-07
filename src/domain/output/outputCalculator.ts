import CsvDataTable from '../csvDataTable';
import CsvInputReader from '../inputData/inputReader';
import { PatternMatcher } from '../pattern/patternMatcher';
import type { PatternOptions } from '../pattern/patternMatcher';
import type { CsvOptions } from '../inputData/types';
import { stringFunctions } from '../pattern/patternFunctions';

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
      let name = nameOrIndex;

      let replaceData: (rowIndex: number) => string;

      if (this.patternMatcher.isFunction(nameOrIndex)) {
        const functionExpr = nameOrIndex.replace('<', '').replace('>', '').split('.');
        const nameOfPlaceHolder = functionExpr.shift()!;
        const functions: Array<(value: string) => string> = functionExpr
          .map((func) => func.replace('()', ''))
          .filter((func) => Object.keys(stringFunctions).includes(func))
          .map((func) => {
            const key = func as keyof typeof stringFunctions;
            return stringFunctions[key]!;
          });

        const resultFunc = functions.reduce(
          (prev, cur) => (value) => cur(prev(value)),
          (value) => value,
        );

        if (this.patternMatcher.isKeyword(nameOfPlaceHolder)) {
          replaceData = (rowIndex) => this.patternMatcher.replaceKeywords(outputEntries[rowIndex], nameOrIndex, rowIndex, this.inputDataEntries, resultFunc);
        } else {
          let replaceInformation = this.getReplaceInformation(index, nameOfPlaceHolder);
          if (!replaceInformation.column) {
            return;
          }
          name = replaceInformation.useIndex ? replaceInformation.column.index.toString() : replaceInformation.column.name.toString();
          const rows = replaceInformation.column.rows;
          replaceData = (rowIndex) => this.patternMatcher.replacePlaceholder(outputEntries[rowIndex], nameOrIndex, rows[rowIndex].value, resultFunc);
        }
      } else if (this.patternMatcher.isKeyword(nameOrIndex)) {
        replaceData = (rowIndex) => this.patternMatcher.replaceKeywords(outputEntries[rowIndex], nameOrIndex, rowIndex, this.inputDataEntries);
      } else {
        let replaceInformation = this.getReplaceInformation(index, nameOrIndex);
        if (!replaceInformation.column) {
          return;
        }
        name = replaceInformation.useIndex ? replaceInformation.column.index.toString() : replaceInformation.column.name.toString();
        const rows = replaceInformation.column.rows;
        replaceData = (rowIndex) => this.patternMatcher.replacePlaceholder(outputEntries[rowIndex], name, rows[rowIndex].value);
      }
      outputEntries.forEach((_, rowIndex) => {
        outputEntries[rowIndex] = replaceData(rowIndex);
      });
    });

    return outputEntries;
  }

  private getReplaceInformation(index: number, nameOrIndex: string) {
    if (isNaN(index)) {
      return {
        column: this.inputDataEntries.getColumnValuesByName(nameOrIndex),
        useIndex: false,
        containsFunction: false,
      };
    } else {
      let data = {
        column: this.inputDataEntries.getColumnValuesByIndex(index),
        useIndex: true,
        containsFunction: false,
      };
      if (!data.column) {
        //edge case, if someone uses a number as a name, but the index does not exist
        return {
          column: this.inputDataEntries.getColumnValuesByName(nameOrIndex),
          useIndex: false,
          containsFunction: false,
        };
      }
      return data;
    }
  }
}
