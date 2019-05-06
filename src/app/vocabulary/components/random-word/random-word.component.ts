import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from '@core/services';
import { WordsService } from '@vocabulary/services';
import { BaseComponent } from '@core/utils';

@Component({
  selector: 'v-random-word',
  templateUrl: './random-word.component.html',
  styleUrls: ['./random-word.component.less']
})
export class RandomWordComponent extends BaseComponent implements OnInit {
  loading: boolean;
  word: any;
  wordCount = 0;

  constructor(
    private notificationService: NotificationService,
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
    ).subscribe(res => {
      this.word = res;
      this.wordCount += 1;
      this.loading = false;
    }, this.notificationService.defaultErrorHandler);
  }

  editComplete(res: any): void {
    this.word = res;
  }
}
