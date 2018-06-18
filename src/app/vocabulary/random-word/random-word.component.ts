import { Component, OnInit } from '@angular/core';

import { WordsService } from '../../core/services';
import { ObservableManager, getErrorMessage } from '../../core/utils';

@Component({
  selector: 'v-random-word',
  templateUrl: './random-word.component.html',
  styleUrls: ['./random-word.component.less']
})
export class RandomWordComponent implements OnInit {

  loading: boolean;

  message: { type: string, text: string };

  word: any;

  om: ObservableManager;

  constructor(private wordsService: WordsService) {
    this.om = new ObservableManager({

      getRandomWord: {
        create: () => {
          this.loading = false;
          return this.wordsService.getRandomWord()
        },
        next: res => {
          this.loading = false;
          this.word = res;
          console.log(this.word);
        }
      }

    }, {

      error: (name, err) => {
        this.message = { type: 'negative', text: getErrorMessage(err) };
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
