import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, tap, mergeMap } from 'rxjs/operators';

import { BaseComponent } from '@core/utils';
import { ErrorService } from '@core/services';
import { WordsService } from '@vocabulary/services';

@Component({
  selector: 'v-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.less']
})
export class WordsListComponent extends BaseComponent implements OnInit {
  loading: boolean;
  search: string;
  words: any[] = [];
  paging = { page: 1, pageSize: 10, total: 0 };

  constructor(
    private errorService: ErrorService,
    private wordsService: WordsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getWords();
  }

  getWords(): void {
    this.loading = true;
    this.getWordsRequest().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      error: err => {
        this.errorService.handleError(err);
        this.loading = false;
      }
    });
  }

  deleteWord(word: any): void {
    this.loading = true;
    this.wordsService.deleteWord(word._id).pipe(
      mergeMap(() => {
        if (this.paging.page > 1 && this.words.length === 1) {
          this.paging.page -= 1;
        }
        return this.getWordsRequest();
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      error: err => {
        this.errorService.handleError(err);
        this.loading = false;
      }
    });
  }

  editComplete(res: any): void {
    const word = this.words.find(w => w._id === res._id);
    Object.assign(word, res);
  }

  trackWord(index: number, word: any): any {
    return word.id;
  }

  private getWordsRequest(): Observable<any> {
    const { page, pageSize } = this.paging;
    return this.wordsService.getWords(this.search, {
      skip: (page * pageSize) - pageSize, limit: pageSize
    }).pipe(
      tap((res: any) => {
        this.words = res.data;
        this.paging = {
          page: (res.skip / res.limit) + 1,
          pageSize: res.limit,
          total: res.total
        };
        this.loading = false;
      })
    );
  }
}
