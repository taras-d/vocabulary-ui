import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ClrLoadingState } from '@clr/angular';

@Component({ selector: 'v-base', template: '' })
export class BaseComponent implements OnDestroy {
  loading: boolean | ClrLoadingState;
  message: { type: string; text: string };
  protected destroy: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
