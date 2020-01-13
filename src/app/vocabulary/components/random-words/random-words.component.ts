import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@shared/components/base/base.component';
import { WordsService } from '@vocabulary/services/words.service';
import { Word } from '@core/models/word';
import { ErrorService } from '@core/services/error.service';

@Component({
  selector: 'v-random-words',
  templateUrl: './random-words.component.html',
  styleUrls: ['./random-words.component.less']
})
export class RandomWordsComponent extends BaseComponent implements OnInit {
  words: Word[];

  constructor(
    private wordsService: WordsService,
    private errorService: ErrorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRandomWords();
  }

  getRandomWords(): void {
    this.loading = true;
    this.message = null;

    this.wordsService.getRandomWords(10).pipe(
      takeUntil(this.destroy$)
    ).subscribe((words: Word[]) => {
      this.words = words;
      this.loading = false;
    }, err => {
      this.message = { type: 'danger', text: this.errorService.parseError(err) };
      this.loading = false;
    });
  }

  trackWord(word: Word): string {
    return word._id;
  }
}
