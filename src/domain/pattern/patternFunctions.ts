export const stringFunctions = {
  toUpperCase: (value: string) => value.toUpperCase(), //new Function('value', 'value.toUpperCase()'),
  toLowerCase: (value: string) => value.toLowerCase(),
  toSentenceCase: (value: string) => {
    const regex = /([.!?])\s+/g;

    // Split the input into sentences
    const sentences = value.split(regex);
    const correctedSentences = sentences.map((sentence, index) => {
      if (index % 2 === 0) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
      } else {
        return sentence;
      }
    });

    const correctedText = correctedSentences.join('');
    return correctedText;
  },
};
