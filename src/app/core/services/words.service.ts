import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class WordsService {
  constructor(private http: HttpClient) {}

  createWord(words: any): Observable<any> {
    return this.http.post(`words`, words, {
      params: { _auth: 'true' }
    });
  }

  getWords(search: string, paging: any): Observable<any> {
    const params: any = {
      _auth: 'true',
      '$sort[createdAt]': '-1',
      $limit: (paging && paging.limit) || '10',
      $skip: (paging && paging.skip) || '0'
    };

    if (search) {
      params.$search = search;
    }

    return this.http.get(`words`, { params }).pipe(
      tap(res => {
        res.data.forEach(this.decorateWord);
      })
    );
  }

  getWord(id: string): Observable<any> {
    return this.http.get(`words/${id}`, {
      params: { _auth: 'true' }
    }).pipe(
      map(this.decorateWord)
    );
  }

  getRandomWord(): Observable<any> {
    return this.http.get(`random-word`, {
      params: { _auth: 'true' }
    }).pipe(
      map(this.decorateWord)
    );
  }

  updateWord(id: number, data: any): Observable<any> {
    return this.http.patch(`words/${id}`, data, {
      params: { _auth: 'true' }
    });
  }

  deleteWord(id: number): Observable<any> {
    return this.http.delete(`words/${id}`, {
      params: { _auth: 'true' }
    });
  }

  private decorateWord = (word: any) => {
    if (word) {
      word.date = moment(word.createdAt).fromNow();
      word.googleTranslateLink = `https://translate.google.com/?#en/auto/${word.text}`;
      word.googleImagesLink = `https://www.google.com/search?tbm=isch&q=${word.text}`;
    }
    return word;
  }
}
