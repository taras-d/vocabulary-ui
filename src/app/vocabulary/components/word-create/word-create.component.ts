import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';

import { BaseComponent } from '@shared/components/base/base.component';
import { WordsService } from '@vocabulary/services/words.service';
import { Word, WordCreateResult } from '@core/models/word';
import { ErrorService } from '@core/services/error.service';

@Component({
  selector: 'v-word-create',
  templateUrl: './word-create.component.html',
  styleUrls: ['./word-create.component.less']
})
export class WordCreateComponent extends BaseComponent {
  @Output() complete = new EventEmitter();

  @ViewChild('itemsWrapper', { static: false }) itemsWrapper: ElementRef;

  open: boolean;
  words: Word[] = [];
  extraInfo: boolean;

  constructor(
    private wordsService: WordsService,
    private errorService: ErrorService
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
    if (this.words.length > 1) {
      this.words.splice(index, 1);
    }
  }

  saveWords(): void {
    this.loading = ClrLoadingState.LOADING;
    this.message = null;

    this.wordsService.createWord(this.words).pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: WordCreateResult) => {
      this.words = [];
      if (res.duplicates) {
        this.message = {
          type: 'info',
          text: 'Words added: <b>5 of 10</b><br/>Duplicated words: <b>word1, word2</b>'
        };
        this.extraInfo = true;
      } else {
        this.open = false;
        this.complete.emit();
      }
    }, err => {
      this.message = { type: 'danger', text: this.errorService.parseError(err) };
      this.loading = ClrLoadingState.DEFAULT;
    });
  }

  trackWord(index: number): any {
    return index;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el: HTMLElement = this.itemsWrapper && this.itemsWrapper.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
