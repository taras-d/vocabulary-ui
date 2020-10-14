import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'v-word-actions',
  templateUrl: './word-actions.component.html',
  styleUrls: ['./word-actions.component.less']
})
export class WordActionsComponent {
  @Input() word;

  @Output() edit = new EventEmitter();
}
