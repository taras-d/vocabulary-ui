import { Component, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';

import { BaseComponent } from '@shared/components/base/base.component';
import { WordsService } from '@vocabulary/services/words.service';
import { Word } from '@core/models/word';
import { ErrorService } from '@core/services/error.service';

@Component({
  selector: 'v-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.less']
})
export class WordEditComponent extends BaseComponent {
  @Output() complete = new EventEmitter();

  open: boolean;
  word: Word;

  constructor(
    private wordsService: WordsService,
    private errorService: ErrorService
  ) {
    super();
  }

  openModal(word: Word): void {
    this.word = Object.assign({}, word);
    this.message = null;
    this.loading = ClrLoadingState.DEFAULT;
    this.open = true;
  }

  updateWord(): void {
    this.loading = ClrLoadingState.LOADING;
    this.message = null;

    this.wordsService.updateWord(this.word._id, {
      text: this.word.text,
      translation: this.word.translation
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: Word) => {
      this.open = false;
      this.loading = ClrLoadingState.DEFAULT;
      this.complete.emit(res);
    }, err => {
      this.message = { type: 'danger', text: this.errorService.parseError(err) };
      this.loading = ClrLoadingState.DEFAULT;
    });
  }
}
