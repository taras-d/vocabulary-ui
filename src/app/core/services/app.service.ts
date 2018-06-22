import { Injectable } from '@angular/core';

import { MessagePanelComponent, Message } from '../../shared/message-panel/message-panel.component';

@Injectable({ providedIn: 'root' })
export class AppService {

  private messagePanelRef: MessagePanelComponent;

  constructor() {

  }

  registerMessagePanel(messagePanel: MessagePanelComponent): void {
    this.messagePanelRef = messagePanel;
  }

  pushMessage(msg: Message): void {
    if (this.messagePanelRef) {
      this.messagePanelRef.push(msg);
    } else {
      console.warn(`Cannot push message. Message panel is not registered.`);
    }
  }

}
