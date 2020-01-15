import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@shared/components/base/base.component';
import { WordsService } from '@vocabulary/services/words.service';
import { Word } from '@core/models/word';
import { ErrorService } from '@core/services/error.service';
import { constants } from '@core/constants';

@Component({
  selector: 'v-random-words',
  templateUrl: './random-words.component.html',
  styleUrls: ['./random-words.component.less']
})
export class RandomWordsComponent extends BaseComponent implements OnInit {
  words: Word[];
  actions = constants.wordActions;

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

  editComplete(res: Word): void {
    const word = this.words.find(w => w._id === res._id);
    Object.assign(word, res);
  }

  wordClick(event: MouseEvent, word: Word): void {
    if (!(event.target as HTMLElement).closest('.word-actions, .dropdown-menu')) {
      word.flip = !word.flip;
    }
  }

  refreshClick(): void {
    this.getRandomWords();
  }
}
