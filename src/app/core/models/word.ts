export interface Word {
  _id?: string;
  text?: string;
  translation: string;
  createdAt?: string;
  updatedAt?: string;
  googleTranslateLink?: string;
  googleImagesLink?: string;
}

export interface WordList {
  data: Word[];
  total: number;
  limit: number;
  skip: number;
}

export interface WordCreateResult {
  total: number;
  inserted: Word[];
  duplicates: Word[];
}
