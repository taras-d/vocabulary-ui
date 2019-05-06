import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from '@core/guards';
import { PageLayoutComponent } from '@shared/components';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { WordsListComponent } from './components/words-list/words-list.component';
import { RandomWordComponent } from './components/random-word/random-word.component';
import { WordsStatsComponent } from './components/words-stats/words-stats.component';

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
            component: WordsListComponent
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
