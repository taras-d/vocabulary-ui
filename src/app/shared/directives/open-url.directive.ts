import { Directive, HostListener, Input } from '@angular/core';
import device from 'current-device';

const isMobile = device.mobile();
const windowMap: { [key: string]: Window } = {};

@Directive({
  selector: '[vOpenUrl]'
})
export class OpenUrlDirective {
  @Input() vOpenUrl: string;

  @HostListener('click')
  linkClick(): void {
    const url = this.vOpenUrl;

    if (isMobile) {
      window.open(url);
      return;
    }

    const origin = new URL(url).origin;
    const wnd = windowMap[origin];

    if (!wnd || wnd.closed) {
      windowMap[origin] = window.open(url);
    } else {
      wnd.location.href = url;
      wnd.focus();
    }
  }
}
