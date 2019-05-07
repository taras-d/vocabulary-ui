import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

import { BaseComponent } from '@core/utils';
import { ErrorService } from '@core/services';
import { WordsService } from '@vocabulary/services';

@Component({
  selector: 'v-word-create',
  templateUrl: './word-create.component.html',
  styleUrls: ['./word-create.component.less']
})
export class WordCreateComponent extends BaseComponent {
  @Output() complete = new EventEmitter();

  loading: boolean;
  open: boolean;
  words: { text: string, translation: string }[] = [];

  constructor(
    private notificationService: NzNotificationService,
    private errorService: ErrorService,
    private wordsService: WordsService
  ) {
    super();
  }

  openModal(): void {
    this.addWord();
    this.open = true;
    this.focusControl('.word-create-modal .items-wrapper input:first-child');
  }

  closeModal(): void {
    this.words = [];
    this.loading = false;
    this.open = false;
  }

  addWord(): void {
    this.words.push({ text: '', translation: '' });
    this.focusControl('.word-create-modal .items-wrapper nz-form-item:last-child input');
    this.scrollToBottom();
  }

  deleteWord(index: number): void {
    this.words.splice(index, 1);
  }

  saveWords(): void {
    this.loading = true;
    this.wordsService.createWord(this.words).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.notificationService.info(
        'Info',
        `New words - <b>${res.inserted}</b>, duplicated words - <b>${res.duplicates}</b>`
      );
      this.closeModal();
      this.complete.emit();
    }, err => {
      this.errorService.handleError(err);
      this.loading = false;
    });
  }

  private focusControl(selector: string): void {
    setTimeout(() => {
      const el: HTMLElement = document.querySelector(selector);
      if (el) {
        el.focus();
      }
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el: HTMLElement = document.querySelector('.word-create-modal .items-wrapper');
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
