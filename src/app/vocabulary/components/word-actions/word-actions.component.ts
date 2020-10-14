import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Word } from '@core/models/word';

@Component({
  selector: 'v-word-actions',
  templateUrl: './word-actions.component.html',
  styleUrls: ['./word-actions.component.less']
})
export class WordActionsComponent {
  @Input() word: Word;

  @Output() edit = new EventEmitter();
}
