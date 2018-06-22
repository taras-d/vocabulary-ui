import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { AppService, WordsService } from '../../core/services';
import { ObservableManager, getErrorMessage } from '../../core/utils';
import { WordEditComponent } from '../word-edit/word-edit.component';
import { WordCreateComponent } from '../word-create/word-create.component';

@Component({
  selector: 'v-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.less']
})
export class WordsComponent implements OnInit, OnDestroy {

  @ViewChild(WordEditComponent) wordEditRef: WordEditComponent;
  @ViewChild(WordCreateComponent) wordCreateRef: WordCreateComponent;

  loading: boolean;

  search: string;
  words: any[] = [];
  paging = { page: 1, pageSize: 10, total: 0, meta: '' };

  om: ObservableManager;

  constructor(
    private appService: AppService,
    private wordsService: WordsService
  ) {
    this.om = new ObservableManager({
      
      getWords: {
        create: () => {
          this.loading = true;
          const paging = this.paging;
          return this.wordsService.getWords(this.search, {
            skip: paging.page * paging.pageSize - paging.pageSize, 
            limit: paging.pageSize
          });
        },
        next: res => {
          this.words = res.data;
          this.paging = {
            page: res.skip / res.limit + 1,
            pageSize: res.limit,
            total: res.total,
            meta: `${res.skip + 1}-${res.skip + res.data.length} of ${res.total} words` 
          };
          this.loading = false;
        }
      },

      deleteWord: {
        create: word => {
          this.loading = true;
          return this.wordsService.deleteWord(word._id);
        },
        next: () => {
          if (this.paging.page > 1 && this.words.length === 1) {
            this.paging.page -= 1;
          }
          this.om.invoke('getWords');
        }
      }

    }, {

      error: (name, err) => {
        this.appService.pushMessage({
          header: 'Error', text: getErrorMessage(err), type: 'error'
        });
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

  onPageChange(page: number): void {
    if (this.paging.page !== page) {
      this.paging.page = page;
      this.om.invoke('getWords');
    }
  }

  onEdit(word: any): void {
    this.wordEditRef.open(word);
  }

  onEditComplete(): void {
    this.om.invoke('getWords');
  }

  onCreate(): void {
    this.wordCreateRef.open();
  }

  onCreateComplete(): void {
    this.om.invoke('getWords');
  }

  onDelete(word: any): void {
    this.om.invoke('deleteWord', word);
  }

  onSearch(): void {
    this.om.invoke('getWords');
  }

}
