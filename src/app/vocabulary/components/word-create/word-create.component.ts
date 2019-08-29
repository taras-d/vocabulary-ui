import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { ClrLoadingState } from '@clr/angular';

import { BaseComponent } from '@shared/components/base/base-component';
import { ErrorService } from '@core/services/error.service';
import { WordsService } from '@vocabulary/services/words.service';
import { Word, WordCreateResult } from '@core/models/word';

@Component({
  selector: 'v-word-create',
  templateUrl: './word-create.component.html',
  styleUrls: ['./word-create.component.less']
})
export class WordCreateComponent extends BaseComponent {
  @Output() complete = new EventEmitter();

  loading: ClrLoadingState = ClrLoadingState.DEFAULT;
  open: boolean;
  words: Word[] = [];
  message: { type: string; text: string };
  extraInfo: boolean;

  constructor(
    private wordsService: WordsService
  ) {
    super();
  }

  openModal(): void {
    if (!this.words.length) {
      this.addWord();
    }
    this.open = true;
    this.loading = ClrLoadingState.DEFAULT;
    this.message = null;
    this.extraInfo = false;
  }

  addWord(): void {
    this.words.push({ text: '', translation: '' });
    this.scrollToBottom();
  }

  deleteWord(index: number): void {
    this.words.splice(index, 1);
  }

  saveWords(): void {
    this.loading = ClrLoadingState.LOADING;
    this.message = null;

    this.wordsService.createWord(this.words).pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: WordCreateResult) => {
      this.words = [];
      if (res.duplicates) {
        this.extraInfo = true;
      } else {
        this.open = false;
        this.complete.emit();
      }
    }, () => {
      this.message = { type: 'danger', text: 'Error' };
      this.loading = ClrLoadingState.DEFAULT;
    });
  }

  trackWord(index: number): any {
    return index;
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
