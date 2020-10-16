import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Word, WordList, WordCreateResult } from '@core/models/word';

@Injectable({ providedIn: 'root' })
export class WordsService {
  constructor(private http: HttpClient) {}

  createWord(words: Word[]): Observable<WordCreateResult> {
    return this.http.post<WordCreateResult>(`words`, words);
  }

  getWords(search: string, paging: any): Observable<WordList> {
    const params: any = {
      '$sort[createdAt]': '-1',
      $limit: (paging && paging.limit) || '10',
      $skip: (paging && paging.skip) || '0'
    };

    if (search) {
      params.$search = search;
    }

    return this.http.get(`words`, { params }).pipe(
      tap((res: WordList) => {
        res.data.forEach(this.decorateWord);
      })
    );
  }

  getWord(id: string): Observable<Word> {
    return this.http.get(`words/${id}`).pipe(
      map(this.decorateWord)
    );
  }

  getRandomWords(size: number): Observable<Word[]> {
    return this.http.get(`random-words`, {
      params: { size: `${size}` }
    }).pipe(
      tap((words: Word[]) => {
        words.forEach(word => this.decorateWord(word));
      })
    );
  }

  updateWord(id: string, data: Word): Observable<any> {
    return this.http.patch(`words/${id}`, data).pipe(
      map(this.decorateWord)
    );
  }

  deleteWord(id: string): Observable<Word> {
    return this.http.delete<Word>(`words/${id}`);
  }

  private decorateWord = (word: Word) => {
    if (word) {
      word.googleTranslateLink = `https://translate.google.com/?#en/auto/${word.text}`;
      word.googleImagesLink = `https://www.google.com/search?tbm=isch&q=${word.text}`;
    }
    return word;
  }
}
