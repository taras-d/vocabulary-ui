import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';

@Component({
  selector: 'v-word-actions',
  templateUrl: './word-actions.component.html',
  styleUrls: ['./word-actions.component.less']
})
export class WordActionsComponent {
  @Input() word: any;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
}
