import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { SuiMessage } from 'ng2-semantic-ui/dist/collections/message/components/message';
import * as _ from 'lodash';

import { AppService } from '../../core/services';

export interface Message {
  duration?: number;
  header?: string;
  text?: string;
  type?: string;
}

@Component({
  selector: 'v-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.less']
})
export class MessagePanelComponent implements OnInit, OnDestroy {

  @ViewChildren(SuiMessage) messagesList: QueryList<SuiMessage>;

  readonly defaultDuration = 10000;

  messages: Message[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.registerMessagePanel(this);
  }

  ngOnDestroy(): void {
    this.messages.forEach(message => {
      clearTimeout(message['_timeoutId']);
    });
  }

  push(msg: Message): void {
    msg = _.defaults(msg, { duration: this.defaultDuration });

    msg['_timeoutId'] = setTimeout(() => {
      // Trigger message `dismiss` when timeout is end
      const index = this.messages.indexOf(msg);
      const msgRef = this.messagesList.toArray()[index];
      if (msgRef) {
        msgRef.dismiss();
      }
    }, msg.duration);

    this.messages.push(msg);
  }

  onDismiss(msgRef: SuiMessage, index: number): void {
    // Remove message after dismiss
    this.messages.splice(index, 1);
  }

}
