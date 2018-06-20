import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuiMessageModule, SuiPopupModule, SuiPaginationModule, SuiModalModule } from 'ng2-semantic-ui';
import { PageLayoutComponent } from './page-layout/page-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    SuiMessageModule,
    SuiPopupModule,
    SuiPaginationModule,
    SuiModalModule
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

    PageLayoutComponent
  ],
  declarations: [
    PageLayoutComponent
  ]
})
export class SharedModule { }
