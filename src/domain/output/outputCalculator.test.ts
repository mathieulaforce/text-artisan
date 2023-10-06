import { beforeEach, describe, expect, it } from 'vitest';
import { OutputCalculator } from './outputCalculator';
import { PatternMatcher } from '../pattern/patternMatcher';
import CsvInputReader from './../inputData/inputReader';

describe('outputCalculator', () => {
  let _calculator: OutputCalculator;
  beforeEach(() => {
    _calculator = new OutputCalculator(new PatternMatcher(), new CsvInputReader());
  });

  it('should generate empty when only input is provided', () => {
    _calculator.setInputInformation('firstname, lastname, country\njohn, doe, UKalfred, judokus, Belgium', { columnSeparator: ',', rowSeparator: '\n', containsHeaderRow: true });
    expect(_calculator.generate()).empty;
  });

  it('should generate empty when only pattern is provided', () => {
    _calculator.setPatternInformation('hello $firstname$ $1$.\n Are you from $h2$ ${country}$', { prefix: '$', suffix: '$' });
    expect(_calculator.generate()).empty;
  });

  it('should generate empty when nothing is provided', () => {
    expect(_calculator.generate()).empty;
  });

  it('should generate text with input and pattern values with header specified', () => {
    _calculator.setInputInformation('firstname, lastname, country\njohn, doe, UK\nalfred, judokus, Belgium', { columnSeparator: ',', rowSeparator: '\n', containsHeaderRow: true });
    _calculator.setPatternInformation('hello $firstname$ $1$.\nAre you from $h2$ $country$', { prefix: '$', suffix: '$' });
    expect(_calculator.generate()).toBe('hello john doe.\nAre you from country UK\nhello alfred judokus.\nAre you from country Belgium');
  });

  it('should generate text with input and pattern values with header not specified', () => {
    _calculator.setInputInformation('john, doe, UK\nalfred, judokus, Belgium', { columnSeparator: ',', rowSeparator: '\n', containsHeaderRow: false });
    _calculator.setPatternInformation('hello $firstname$ $1$.\nAre you from $h2$ $country$', { prefix: '$', suffix: '$' });
    expect(_calculator.generate()).toBe('hello $firstname$ doe.\nAre you from  $country$\nhello $firstname$ judokus.\nAre you from  $country$');
  });

  it('should generate text with keywords', () => {
    _calculator.setInputInformation('firstname, lastname, country\njohn, doe, UK\nalfred, judokus, Belgium', { columnSeparator: ',', rowSeparator: '\n', containsHeaderRow: true });
    _calculator.setPatternInformation('$rowIndex$ != $rowNumber$ $h0$', { prefix: '$', suffix: '$' });
    expect(_calculator.generate()).toBe('0 != 1 firstname\n1 != 2 firstname');
  });

  it('should generate text and not crash when columns do not match with header', () => {
    _calculator.setInputInformation('firstname, lastname, country\njohn, doe, UK\nalfred, judokus', { columnSeparator: ',', rowSeparator: '\n', containsHeaderRow: true });
    _calculator.setPatternInformation('hello $firstname$ $1$.\nAre you from $h2$ $country$', { prefix: '$', suffix: '$' });

    expect(_calculator.generate()).toBe('hello john doe.\nAre you from country UK\nhello alfred judokus.\nAre you from country ');
  });

  it('should generate text and not crash when columns row contains no separator', () => {
    _calculator.setInputInformation('firstname, lastname, country\njohn, doe, UK\nalfred', { columnSeparator: ',', rowSeparator: '\n', containsHeaderRow: true });
    _calculator.setPatternInformation('hello $firstname$ $1$.\nAre you from $h2$ $country$', { prefix: '$', suffix: '$' });

    expect(_calculator.generate()).toBe('hello john doe.\nAre you from country UK\nhello alfred .\nAre you from country ');
  });

  it('should generate text and not crash when columns contains more values than header (difference in last row)', () => {
    _calculator.setInputInformation('firstname, lastname\njohn, doe, UK\nalfred', { columnSeparator: ',', rowSeparator: '\n', containsHeaderRow: true });
    _calculator.setPatternInformation('$0$ - $1$ - $2$', { prefix: '$', suffix: '$' });

    expect(_calculator.generate()).toBe('john - doe - UK\nalfred -  - ');
  });
  +it('should generate text and not crash when columns contains more values than header (difference in first row)', () => {
    _calculator.setInputInformation('firstname, lastname\nalfred\njohn, doe, UK', { columnSeparator: ',', rowSeparator: '\n', containsHeaderRow: true });
    _calculator.setPatternInformation('$0$ - $1$ - $2$', { prefix: '$', suffix: '$' });

    expect(_calculator.generate()).toBe('alfred -  - \njohn - doe - UK');
  });

  it('should generate text and not crash when columns contains more values than header and using header placeholders', () => {
    _calculator.setInputInformation('firstname, lastname\nalfred\njohn, doe, UK', { columnSeparator: ',', rowSeparator: '\n', containsHeaderRow: true });
    _calculator.setPatternInformation('$firstname$ - $lastname$ - $2$', { prefix: '$', suffix: '$' });

    expect(_calculator.generate()).toBe('alfred -  - \njohn - doe - UK');
  });
});
