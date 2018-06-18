import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocabularyComponent } from './vocabulary.component';
import { WordsComponent } from './words/words.component';
import { RandomWordComponent } from './random-word/random-word.component';
import { PageLayoutComponent } from '../shared/page-layout/page-layout.component';
import { AuthenticatedGuard } from '../core/guards';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: '',
        component: VocabularyComponent,
        children: [
          {
            path: '',
            component: WordsComponent
          },
          {
            path: 'random-word',
            component: RandomWordComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VocabularyRoutingModule { }
