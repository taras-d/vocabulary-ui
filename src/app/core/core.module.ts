import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from '@core/interceptors/api.interceptor';
import { AppStartService } from '@core/services/app-start.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appStart => () => appStart.load(),
      deps: [AppStartService],
      multi: true
    }
  ]
})
export class CoreModule { }
