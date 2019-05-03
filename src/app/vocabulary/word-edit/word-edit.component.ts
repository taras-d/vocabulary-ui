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
  open: boolean;
  word: any;

  constructor(
    private notificationService: NzNotificationService,
    private wordsService: WordsService
  ) {
    super();
  }

  openModal(word: any): void {
    this.word = Object.assign({}, word);
    this.open = true;
    this.focusFirstControl();
  }

  closeModal(): void {
    this.word = null;
    this.loading = false;
    this.open = false;
  }

  updateWord(): void {
    this.loading = true;
    this.wordsService.updateWord(this.word._id, this.word).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.closeModal();
      this.complete.emit();
    }, err => {
      this.notificationService.error('Error', getErrorMsg(err));
      this.loading = false;
    });
  }

  focusFirstControl(): void {
    setTimeout(() => {
      const el: HTMLElement = document.querySelector('.word-edit-modal form textarea:first-child');
      if (el) {
        el.focus();
      }
    });
  }
}
