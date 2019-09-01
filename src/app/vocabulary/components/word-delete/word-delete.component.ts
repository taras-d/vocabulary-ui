import { Component, Output, EventEmitter, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';

import { Word } from '@core/models/word';
import { WordsService } from '@vocabulary/services/words.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { ErrorService } from '@core/services/error.service';

@Component({
  selector: 'v-word-delete',
  templateUrl: './word-delete.component.html',
  styleUrls: ['./word-delete.component.less']
})
export class WordDeleteComponent extends BaseComponent {
  @Input() word: Word;
  @Output() complete = new EventEmitter();

  open: boolean;

  constructor(
    private wordsService: WordsService,
    private errorService: ErrorService
  ) {
    super();
  }

  openModal(word: Word): void {
    this.word = word;
    this.open = true;
  }

  deleteClick(): void {
    this.loading = ClrLoadingState.LOADING;

    this.wordsService.deleteWord(this.word._id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.open = false;
      this.loading = ClrLoadingState.DEFAULT;
      this.complete.emit(this.word);
    }, err => {
      this.message = { type: 'danger', text: this.errorService.parseError(err) };
      this.loading = ClrLoadingState.DEFAULT;
    });
  }
}
