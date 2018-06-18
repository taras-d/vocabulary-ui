export const decorateWord = word => {
  if (word) {
    word.googleTranslateLink = `https://translate.google.com/?#en/auto/${word.text}`;
    word.googleImagesLink = `https://www.google.com/search?tbm=isch&q=${word.text}`;
  }
  return word;
};