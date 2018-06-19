import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

import { ApiService } from './api.service';
import { decorateWord } from '../utils';

@Injectable({ providedIn: 'root' })
export class WordsService {

  constructor(private apiService: ApiService) {

  }

  createWord(words: any): Observable<any> {
    return this.apiService.post(`words`, words);
  }

  getWords(search: string, sort: any, paging: any): Observable<any> {
    const params: any = {
      // $search: search || undefined,
      // $sort: sort || undefined,
      $limit: _.get(paging, 'limit', 10),
      $skip: _.get(paging, 'skip', 0)
    };

    return this.apiService.get(`words`, { params }).pipe(
      tap(res => {
        res.data.forEach(decorateWord)
      })
    );
  }

  getRandomWord(): Observable<any> {
    return this.apiService.get(`random-word`).pipe(
      map(word => decorateWord(word))
    );
  }

  updateWord(id: number, data: any): Observable<any> {
    return this.apiService.patch(`words/${id}`, data);
  }

  deleteWord(id: number): Observable<any> {
    return this.apiService.delete(`words/${id}`);
  }

}