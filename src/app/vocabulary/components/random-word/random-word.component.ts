import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@core/utils';
import { ErrorService } from '@core/services/error.service';
import { WordsService } from '@vocabulary/services/words.service';
import { Word } from '@core/models/word';

@Component({
  selector: 'v-random-word',
  templateUrl: './random-word.component.html',
  styleUrls: ['./random-word.component.less']
})
export class RandomWordComponent extends BaseComponent implements OnInit {
  loading: boolean;
  word: Word;
  wordCount = 0;

  constructor(
    private errorService: ErrorService,
    private wordsService: WordsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRandomWord();
  }

  getRandomWord(): void {
    this.loading = true;
    this.wordsService.getRandomWord().pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: Word) => {
      this.word = res;
      this.wordCount += 1;
      this.loading = false;
    }, err => {
      this.errorService.handleError(err);
    });
  }

  editComplete(res: Word): void {
    this.word = res;
  }
}
