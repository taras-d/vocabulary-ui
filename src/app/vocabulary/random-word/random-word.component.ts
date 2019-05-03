import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { takeUntil } from 'rxjs/operators';

import { WordsService } from '@core/services';
import { BaseComponent, getErrorMsg } from '@core/utils';

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
    private notificationService: NzNotificationService,
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
    }, err => {
      this.notificationService.error('Error', getErrorMsg(err));
    });
  }

  reloadWord(): void {
    this.loading = true;
    this.wordsService.getWord(this.word._id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.word = res;
      this.loading = false;
    }, err => {
      this.notificationService.error('Error', getErrorMsg(err));
    });
  }
}
