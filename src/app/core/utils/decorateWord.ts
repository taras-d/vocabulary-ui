import * as moment from 'moment';

export const decorateWord = word => {
  if (word) {
    word.date = moment(word.createdAt).fromNow();
    word.googleTranslateLink = `https://translate.google.com/?#en/auto/${word.text}`;
    word.googleImagesLink = `https://www.google.com/search?tbm=isch&q=${word.text}`;
  }
  return word;
};
