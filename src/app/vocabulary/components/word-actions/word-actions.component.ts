import { Component, Output, EventEmitter, Input, HostListener, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

import { Word } from '@core/models';

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

  constructor(private modalService: NzModalService) {

  }

  ngOnInit(): void {
    this.detectScreen();
  }

  deleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Delete word',
      nzContent: 'Are you sure?',
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () => this.delete.emit()
    });
  }

  @HostListener('window:resize')
  private detectScreen(): void {
    this.isSmallScreen = window.innerWidth <= 650;
  }
}
