import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@shared/components/base/base.component';
import { WordsService } from '@vocabulary/services/words.service';
import { Word } from '@core/models/word';
import { ErrorService } from '@core/services/error.service';

@Component({
  selector: 'v-random-word',
  templateUrl: './random-word.component.html',
  styleUrls: ['./random-word.component.less']
})
export class RandomWordComponent extends BaseComponent implements OnInit {
  word: Word;
  wordCount = 0;

  constructor(
    private wordsService: WordsService,
    private errorService: ErrorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRandomWord();
  }

  getRandomWord(): void {
    this.loading = true;
    this.message = null;

    this.wordsService.getRandomWord().pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: Word) => {
      this.word = res;
      if (this.word) {
        this.wordCount += 1;
      } else {
        this.message = { type: 'info', text: 'No data' };
      }
      this.loading = false;
    }, err => {
      this.message = { type: 'danger', text: this.errorService.parseError(err) };
      this.loading = false;
    });
  }

  editComplete(res: Word): void {
    this.word = res;
  }
}
