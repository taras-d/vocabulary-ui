import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { AppService, WordsService } from '../../core/services';
import { ObserverManager, getErrorMessage } from '../../core/utils';
import { WordEditComponent } from '../word-edit/word-edit.component';

@Component({
  selector: 'v-random-word',
  templateUrl: './random-word.component.html',
  styleUrls: ['./random-word.component.less']
})
export class RandomWordComponent implements OnInit, OnDestroy {

  @ViewChild(WordEditComponent) wordEditRef: WordEditComponent;

  loading: boolean;

  word: any;

  om: ObserverManager;

  constructor(
    private appService: AppService,
    private wordsService: WordsService
  ) {
    this.om = new ObserverManager({

      getRandomWord: {
        create: () => {
          this.loading = true;
          return this.wordsService.getRandomWord();
        },
        next: res => {
          this.word = res;
          this.loading = false;
        }
      },

      reloadWord: {
        create: () => {
          this.loading = true;
          return this.wordsService.getWord(this.word._id);
        },
        next: res => {
          this.word = res;
          this.loading = false;
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
    this.om.invoke('getRandomWord');
  }

  ngOnDestroy(): void {
    this.om.unsubAll();
  }

  onNext(): void {
    this.om.invoke('getRandomWord');
  }

  onEdit(): void {
    this.wordEditRef.open(this.word);
  }

  onEditComplete(): void {
    this.om.invoke('reloadWord');
  }

}
