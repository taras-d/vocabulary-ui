import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';

import { BaseComponent } from '@shared/components/base/base.component';
import { WordsService } from '@vocabulary/services/words.service';
import { Word } from '@core/models/word';
import { ErrorService } from '@core/services/error.service';
import { constants } from '@core/constants';
import { WordEditComponent } from '../word-edit/word-edit.component';
import { WordCreateComponent } from '../word-create/word-create.component';
import { WordDeleteComponent } from '../word-delete/word-delete.component';

@Component({
  selector: 'v-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.less']
})
export class WordsListComponent extends BaseComponent implements OnInit {
  @ViewChild(WordEditComponent, { static: true }) wordEditRef: WordEditComponent;
  @ViewChild(WordCreateComponent, { static: true }) wordCreateRef: WordCreateComponent;
  @ViewChild(WordDeleteComponent, { static: true }) wordDeleteRef: WordDeleteComponent;

  actionMenuVisible: boolean;
  search: string;
  words: Word[] = [];
  paging = { page: 1, pageSize: 10, total: 0 };

  actions = constants.wordActions;

  constructor(
    private wordsService: WordsService,
    private errorService: ErrorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setActionMenuVisible();
    this.getWords();
  }

  editClick(word: Word): void {
    this.wordEditRef.openModal(word);
  }

  editComplete(res: Word): void {
    const word = this.words.find(w => w._id === res._id);
    Object.assign(word, res);
  }

  deleteClick(word: Word): void {
    this.wordDeleteRef.openModal(word);
  }

  deleteComplete(): void {
    if (this.paging.page > 1 && this.words.length === 1) {
      this.paging.page -= 1;
    }
    this.getWords();
  }

  createClick(): void {
    this.wordCreateRef.openModal();
  }

  createComplete(): void {
    this.getWords();
  }

  getWords(): void {
    this.loading = true;

    const { page, pageSize } = this.paging;

    this.wordsService.getWords(this.search, {
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
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      error: err => {
        this.message = { type: 'danger', text: this.errorService.parseError(err) };
        this.loading = false;
      }
    });
  }

  pageChanged(page: number): void {
    this.paging.page = page;
    this.getWords();
  }

  trackWord(index: number, word: any): any {
    return word._id;
  }

  @HostListener('window:resize')
  private setActionMenuVisible(): void {
    this.actionMenuVisible = window.innerWidth <= 600;
  }
}
