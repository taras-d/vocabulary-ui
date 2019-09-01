import { Component, Output, EventEmitter, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';

import { Word } from '@core/models/word';
import { WordsService } from '@vocabulary/services/words.service';
import { BaseComponent } from '@shared/components/base/base.component';

@Component({
  selector: 'v-word-delete',
  templateUrl: './word-delete.component.html',
  styleUrls: ['./word-delete.component.less']
})
export class WordDeleteComponent extends BaseComponent {
  @Input() word: Word;
  @Output() complete = new EventEmitter();

  loading: ClrLoadingState = ClrLoadingState.DEFAULT;
  open: boolean;

  constructor(
    private wordsService: WordsService
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
      // TODO: Show error message
      console.log(err);
      this.loading = ClrLoadingState.DEFAULT;
    });
  }
}
