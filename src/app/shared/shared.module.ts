import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

import { NotEmptyValidatorDirective } from './directives/not-empty.directive';
import { OpenUrlDirective } from './directives/open-url.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    ClarityModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,

    ClarityModule,

    PageLayoutComponent,
    AlertMessageComponent,

    NotEmptyValidatorDirective,
    OpenUrlDirective
  ],
  declarations: [
    PageLayoutComponent,
    AlertMessageComponent,

    NotEmptyValidatorDirective,
    OpenUrlDirective
  ]
})
export class SharedModule { }
