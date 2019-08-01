import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { PageLayoutComponent } from './components/page-layout/page-layout.component';

import { NotEmptyValidatorDirective } from './directives/not-empty.directive';
import { OpenUrlDirective } from './directives/open-url.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

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
    NzNotificationModule,
    NzPopoverModule,
    NzGridModule,
    NzTableModule,
    NzPopconfirmModule,
    NzPaginationModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,

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
    NzNotificationModule,
    NzPopoverModule,
    NzGridModule,
    NzTableModule,
    NzPopconfirmModule,
    NzPaginationModule,

    PageLayoutComponent,

    NotEmptyValidatorDirective,
    OpenUrlDirective
  ],
  declarations: [
    PageLayoutComponent,

    NotEmptyValidatorDirective,
    OpenUrlDirective
  ]
})
export class SharedModule { }
