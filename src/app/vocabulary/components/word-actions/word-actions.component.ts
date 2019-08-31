import { Component, Output, EventEmitter, Input, HostListener, OnInit } from '@angular/core';

import { Word } from '@core/models/word';

const actions = {
  openGoogleTranslate: 'Open in Google Translate',
  openGoogleImages: 'Open in Google Images',
  editWord: 'Edit word',
  deleteWord: 'Delete word'
};

@Component({
  selector: 'v-word-actions',
  templateUrl: './word-actions.component.html',
  styleUrls: ['./word-actions.component.less']
})
export class WordActionsComponent implements OnInit {
  @Input() word: Word;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  isSmallScreen: boolean;
  isDeleteConfirmOpen: boolean;

  actions = actions;

  ngOnInit(): void {
    this.detectScreen();
  }

  editClick(): void {
    this.edit.emit();
  }

  deleteClick(): void {
    this.isDeleteConfirmOpen = true;
  }

  deleteConfirm(): void {
    this.isDeleteConfirmOpen = false;
    this.delete.emit();
  }

  @HostListener('window:resize')
  private detectScreen(): void {
    this.isSmallScreen = window.innerWidth <= 650;
  }
}
