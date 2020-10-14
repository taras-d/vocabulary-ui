import { Component, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() canDelete = true;

  @Output() editComplete = new EventEmitter();
  @Output() deleteComplete = new EventEmitter();

  open: boolean;
  word: Word;
  isDelete: boolean;

  constructor(
    private wordsService: WordsService,
    private errorService: ErrorService
  ) {
    super();
  }

  openModal(word: Word): void {
    this.word = Object.assign({}, word);
    this.isDelete = false;
    this.message = null;
    this.loading = ClrLoadingState.DEFAULT;
    this.open = true;
  }

  closeModal(): void {
    this.open = false;
  }

  updateWord(): void {
    this.loading = ClrLoadingState.LOADING;
    this.message = null;

    this.wordsService.updateWord(this.word._id, {
      text: this.word.text,
      translation: this.word.translation
    }).pipe(
      takeUntil(this.destroy)
    ).subscribe((res: Word) => {
      this.open = false;
      this.loading = ClrLoadingState.DEFAULT;
      this.editComplete.emit(res);
    }, err => {
      this.message = { type: 'danger', text: this.errorService.parseError(err) };
      this.loading = ClrLoadingState.DEFAULT;
    });
  }

  deleteWord(): void {
    this.loading = ClrLoadingState.LOADING;
    this.message = null;

    this.wordsService.deleteWord(this.word._id).pipe(
      takeUntil(this.destroy)
    ).subscribe(() => {
      this.open = false;
      this.loading = ClrLoadingState.DEFAULT;
      this.deleteComplete.emit(this.word);
    }, err => {
      this.message = { type: 'danger', text: this.errorService.parseError(err) };
      this.loading = ClrLoadingState.DEFAULT;
    });
  }

  showDelete(isDelete: boolean): void {
    this.isDelete = isDelete;
    this.message = null;
  }
}
