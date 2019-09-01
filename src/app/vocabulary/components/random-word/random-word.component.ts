import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@shared/components/base/base.component';
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
  message: { type: string, text: string };

  constructor(
    private wordsService: WordsService
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
    }, () => {
      this.message = { type: 'danger', text: 'Service temporarely unavailable' };
      this.loading = false;
    });
  }

  editComplete(res: Word): void {
    this.word = res;
  }
}
