import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from '@core/guards';
import { PageLayoutComponent } from '@shared/page-layout/page-layout.component';
import { VocabularyComponent } from './vocabulary.component';
import { WordsComponent } from './words/words.component';
import { RandomWordComponent } from './random-word/random-word.component';
import { WordsStatsComponent } from './words-stats/words-stats.component';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    canActivate: [AuthorizedGuard],
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
          },
          {
            path: 'stats',
            component: WordsStatsComponent
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
