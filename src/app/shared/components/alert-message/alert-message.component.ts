import { Component, Input } from '@angular/core';

@Component({
  selector: 'v-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.less']
})
export class AlertMessageComponent {
  @Input() message: { type: string; text: string };
}
