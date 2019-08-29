import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

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

  loading: boolean;
  open: boolean;
  words: Word[] = [];

  constructor(
    private notificationService: NzNotificationService,
    private errorService: ErrorService,
    private wordsService: WordsService
  ) {
    super();
  }

  openModal(): void {
    if (!this.words.length) {
      this.addWord();
    }
    this.open = true;
  }

  closeModal(): void {
    this.loading = false;
    this.open = false;
  }

  addWord(): void {
    this.words.push({ text: '', translation: '' });
    this.scrollToBottom();
  }

  deleteWord(index: number): void {
    this.words.splice(index, 1);
  }

  saveWords(): void {
    this.loading = true;
    this.wordsService.createWord(this.words).pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: WordCreateResult) => {
      const method = res.duplicates ? 'info' : 'success';
      this.notificationService[method](
        'Info', `New words - <b>${res.inserted}</b>, duplicated words - <b>${res.duplicates}</b>`
      );
      this.words = [];
      this.closeModal();
      this.complete.emit();
    }, err => {
      this.errorService.handleError(err);
      this.loading = false;
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
