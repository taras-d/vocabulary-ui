import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@core/utils';
import { ErrorService } from '@core/services';
import { WordsService } from '@vocabulary/services';

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
    private errorService: ErrorService,
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
    this.wordsService.updateWord(this.word._id, {
      text: this.word.text,
      translation: this.word.translation
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.closeModal();
      this.complete.emit(res);
    }, err => {
      this.errorService.handleError(err);
      this.loading = false;
    });
  }

  focusFirstControl(): void {
    setTimeout(() => {
      const el: HTMLElement = document.querySelector('.word-edit-modal form input:first-child');
      if (el) {
        el.focus();
      }
    });
  }
}
