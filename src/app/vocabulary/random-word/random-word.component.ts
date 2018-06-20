import { Component, OnInit, OnDestroy } from '@angular/core';

import { WordsService } from '../../core/services';
import { ObservableManager } from '../../core/utils';

@Component({
  selector: 'v-random-word',
  templateUrl: './random-word.component.html',
  styleUrls: ['./random-word.component.less']
})
export class RandomWordComponent implements OnInit, OnDestroy {

  loading: boolean;

  word: any;

  om: ObservableManager;

  constructor(private wordsService: WordsService) {
    this.om = new ObservableManager({

      getRandomWord: {
        create: () => {
          this.loading = true;
          return this.wordsService.getRandomWord()
        },
        next: res => {
          this.word = res;
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
    this.om.invoke('getRandomWord');
  }

  ngOnDestroy(): void {
    this.om.unsubAll();
  }

  onNext(): void {
    this.om.invoke('getRandomWord');
  }

}
