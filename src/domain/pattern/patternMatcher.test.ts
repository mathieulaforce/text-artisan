import { describe, expect, it, test } from 'vitest';
import { PatternMatcher } from './patternMatcher';

describe('patternMatcher', () => {
  describe('containsMatches ', () => {
    it('should contain matches', () => {
      const pattern = new PatternMatcher();
      pattern.preparePatternMatch('$match1$nomatch$match2$\n$ match 3$ something ', { prefix: '$', suffix: '$' });
      expect(pattern.containsMatches()).true;
    });

    it('should contain no matches', () => {
      const pattern = new PatternMatcher();
      test.each([
        { prefix: '^', suffix: '$' },
        { prefix: 'µ', suffix: 'µ' },
        { prefix: 'q', suffix: 'q' },
      ])('prefix %i.prefix suffix %i.suffix', (options) => {
        pattern.preparePatternMatch('$match1$nomatch$match2$\n$ match 3$ something ', options);
        expect(pattern.containsMatches()).false;
      });
    });
  });

  describe('getUnwrappedMatchedNames', () => {
    it('should return array with matches', () => {
      const pattern = new PatternMatcher();
      pattern.preparePatternMatch('$match1$nomatch$match2$\n$ match 3$ something ', { prefix: '$', suffix: '$' });
      expect(pattern.getUnwrappedMatchedNames()).toEqual(['match1', 'match2', 'match 3']);
    });
  });

  describe('replacePlaceholder', () => {
    it('should replace with value', () => {
      const patternMatcher = new PatternMatcher();
      const value = '$match1$nomatch$match2$\n$ match 3$ something ';
      patternMatcher.preparePatternMatch(value, { prefix: '$', suffix: '$' });
      const result = patternMatcher.replacePlaceholder(value, 'match1', 'ok');
      expect(result).toEqual('oknomatch$match2$\n$ match 3$ something ');
    });
  });
});
