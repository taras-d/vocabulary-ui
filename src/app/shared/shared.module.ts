import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NzCardModule,
  NzButtonModule,
  NzIconModule,
  NzFormModule,
  NzInputModule,
  NzAlertModule,
  NzDropDownModule,
  NzModalModule,
  NzMenuModule,
  NzSpinModule,
  NzEmptyModule,
  NzNotificationModule,
  NzBadgeModule,
  NzPopoverModule,
  NzGridModule
} from 'ng-zorro-antd';

import { SuiMessageModule, SuiPopupModule, SuiPaginationModule, SuiModalModule, SuiDropdownModule } from 'ng2-semantic-ui';
import { PageLayoutComponent } from './page-layout/page-layout.component';

import { NotEmptyValidatorDirective } from './directives/not-empty.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzAlertModule,
    NzDropDownModule,
    NzModalModule,
    NzMenuModule,
    NzSpinModule,
    NzEmptyModule,
    NzNotificationModule,
    NzBadgeModule,
    NzPopoverModule,
    NzGridModule,

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

    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzAlertModule,
    NzDropDownModule,
    NzModalModule,
    NzMenuModule,
    NzSpinModule,
    NzEmptyModule,
    NzNotificationModule,
    NzBadgeModule,
    NzPopoverModule,
    NzGridModule,

    SuiMessageModule,
    SuiPopupModule,
    SuiPaginationModule,
    SuiModalModule,
    SuiDropdownModule,

    PageLayoutComponent,

    NotEmptyValidatorDirective
  ],
  declarations: [
    PageLayoutComponent,

    NotEmptyValidatorDirective
  ]
})
export class SharedModule { }
