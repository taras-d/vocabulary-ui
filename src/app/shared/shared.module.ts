import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuiMessageModule, SuiPopupModule, SuiPaginationModule, SuiModalModule, SuiDropdownModule } from 'ng2-semantic-ui';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    SuiMessageModule,
    SuiPopupModule,
    SuiPaginationModule,
    SuiModalModule,
    SuiDropdownModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    SuiMessageModule,
    SuiPopupModule,
    SuiPaginationModule,
    SuiModalModule,
    SuiDropdownModule,

    PageLayoutComponent,
    MessagePanelComponent
  ],
  declarations: [
    PageLayoutComponent,
    MessagePanelComponent
  ]
})
export class SharedModule { }
