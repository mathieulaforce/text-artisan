import CsvDataTable from '../csvDataTable';

export interface PatternOptions {
  prefix: string;
  suffix: string;
}

export class PatternMatcher {
  private _pattern: string = '';
  public get pattern(): string {
    return this._pattern;
  }

  private options: PatternOptions | null = null;
  private matchArray: RegExpMatchArray | null = null;

  preparePatternMatch(pattern: string, options: PatternOptions) {
    this._pattern = pattern;
    this.options = options;
    const regexPattern = this.createGeneralRegexPattern(options);
    this.matchArray = pattern.match(regexPattern);
  }

  reset() {
    this._pattern = '';
    this.options = null;
    this.matchArray = null;
  }

  getUnwrappedMatchedNames() {
    if (!this.options) {
      return [];
    }
    if (this.matchArray) {
      return this.matchArray.map((value) =>
        value
          .substring(0, value.length - this.options!.suffix.length)
          .substring(this.options!.prefix.length)
          .trim(),
      );
    }
    return [];
  }

  containsMatches() {
    return !!this.matchArray;
  }

  replacePlaceholder(currentValue: string, placeHolder: string, valueToReplace: string, func?: (v: string) => string) {
    if (func) {
      valueToReplace = func(valueToReplace);
    }
    return this.replaceValue(currentValue, placeHolder, valueToReplace);
  }

  isFunction(placeholderName: string) {
    return placeholderName.startsWith('<') && placeholderName.endsWith('>');
  }

  replaceAndHandleFunction(functions: string) {}

  isKeyword(keyword: string) {
    if (['rowNumber', 'rowIndex'].includes(keyword)) {
      return true;
    }

    return keyword.match(/^h.*\d$/g) !== null;
  }

  replaceKeywords(output: string, name: string, rowIndex: number, dataEntry: CsvDataTable, func?: (v: string) => string) {
    if (name === `rowNumber`) {
      return this.replaceValue(output, `rowNumber`, (rowIndex + 1).toString());
    }
    if (name === `rowIndex`) {
      return this.replaceValue(output, `rowIndex`, rowIndex.toString());
    }

    if (!!name.match(/^h.*\d$/g) !== null) {
      let headerName = dataEntry.getHeadernameByIndex(+name.substring(1));
      if (func) {
        headerName = func(headerName ?? '');
      }
      return this.replaceValue(output, name, headerName ?? '');
    }
    return output;
  }

  replaceFunctions(output: string, name: string, dataEntry: CsvDataTable) {
    const nameAndFunctions = name.split('.');
    const nameWithoutFunctions = nameAndFunctions.shift();
    const functions = nameAndFunctions;
  }

  private createGeneralRegexPattern(options: PatternOptions) {
    const escapedPrefix = this.escapeRegex(options.prefix);
    const escapedSuffix = this.escapeRegex(options.suffix);

    return new RegExp(`(${escapedPrefix}.+?${escapedSuffix})`, 'g');
  }

  private replaceValue(currentValue: string, placeHolderName: string | number, valueToReplace: string) {
    if (!this.options) {
      return valueToReplace;
    }
    const patternToReplace = new RegExp(this.escapeRegex(this.wrapPlaceHolder(placeHolderName.toString())), 'g');
    const newValue = currentValue.replace(patternToReplace, valueToReplace);
    return newValue;
  }

  private wrapPlaceHolder(placeHolderName: string) {
    return `${this.options!.prefix}${placeHolderName}${this.options!.suffix}`;
  }

  private escapeRegex(pattern: string): string {
    const regexChars = /[.*+?^${}()|[\]\\]/g;
    return pattern.replace(regexChars, '\\$&');
  }
}
