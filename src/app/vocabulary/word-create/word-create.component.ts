import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

import { BaseComponent, getErrorMsg } from '@core/utils';
import { WordsService } from '@core/services';

@Component({
  selector: 'v-word-create',
  templateUrl: './word-create.component.html',
  styleUrls: ['./word-create.component.less']
})
export class WordCreateComponent extends BaseComponent {
  @Output() complete = new EventEmitter();

  loading: boolean;
  visible: boolean;
  words: { text: string, translation: string }[] = [];

  constructor(
    private notificationService: NzNotificationService,
    private wordsService: WordsService
  ) {
    super();
  }

  open(): void {
    this.addWord();
    this.visible = true;
  }

  addWord(): void {
    this.words.push({ text: '', translation: '' });
  }

  deleteWord(index: number): void {
    this.words.splice(index, 1);
  }

  save(): void {
    this.loading = true;
    this.wordsService.createWord(this.words).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.notificationService.info(`Added: ${res.inserted}, duplicates: ${res.duplicates}`, '');
      this.loading = false;
      this.visible = false;
      this.complete.emit();
    }, err => {
      this.notificationService.error('Error', getErrorMsg(err));
      this.loading = false;
    });
  }

  close(): void {
    this.words = [];
    this.visible = false;
  }
}
