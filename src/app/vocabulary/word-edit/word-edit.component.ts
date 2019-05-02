import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

import { BaseComponent, getErrorMsg } from '@core/utils';
import { WordsService } from '@core/services';

@Component({
  selector: 'v-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.less']
})
export class WordEditComponent extends BaseComponent {
  @Output() complete = new EventEmitter();

  loading: boolean;
  visible: boolean;
  word: any;

  constructor(
    private notificationService: NzNotificationService,
    private wordsService: WordsService
  ) {
    super();
  }

  updateWord(): void {
    this.loading = true;
    this.wordsService.updateWord(this.word._id, this.word).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loading = false;
      this.visible = false;
      this.complete.emit();
    }, err => {
      this.notificationService.error('Error', getErrorMsg(err));
      this.loading = false;
    });
  }

  open(word: any): void {
    this.word = Object.assign({}, word);
    this.visible = true;
  }

  close(): void {
    this.word = null;
    this.loading = false;
    this.visible = false;
  }
}
