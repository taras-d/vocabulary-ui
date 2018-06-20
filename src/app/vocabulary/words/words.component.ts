import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { WordsService } from '../../core/services';
import { ObservableManager } from '../../core/utils';
import { WordEditComponent } from '../word-edit/word-edit.component';

@Component({
  selector: 'v-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.less']
})
export class WordsComponent implements OnInit, OnDestroy {

  @ViewChild(WordEditComponent) wordEditRef: WordEditComponent;

  loading: boolean;

  search: string;
  words: any[] = [];
  paging = { skip: 0, limit: 10, total: 0 };

  om: ObservableManager;

  constructor(private wordsService: WordsService) {
    this.om = new ObservableManager({
      
      getWords: {
        create: () => {
          this.loading = true;
          return this.wordsService.getWords(this.search, { createdAt: -1 }, this.paging);
        },
        next: res => {
          this.words = res.data;
          this.paging = _.pick(res, ['skip', 'limit', 'total']);
          this.loading = false;
        }
      }

    }, {

      error: (name, err) => {
        console.error(err);
        this.loading = false;
      }

    });
  }

  ngOnInit(): void {
    this.om.invoke('getWords');
  }

  ngOnDestroy(): void {
    this.om.unsubAll();
  }

  onEdit(word: any): void {
    this.wordEditRef.openEdit(word);
  }

  onPageChange(page: number): void {
    this.paging.skip = this.paging.limit * (page - 1);
    this.om.invoke('getWords');
  }

  onEditComplete(): void {
    this.om.invoke('getWords');
  }

}
