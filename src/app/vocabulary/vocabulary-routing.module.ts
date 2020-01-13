import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from '@core/guards/authorized.guard';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { WordsListComponent } from './components/words-list/words-list.component';
import { RandomWordsComponent } from './components/random-words/random-words.component';
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
            path: 'random-words',
            component: RandomWordsComponent
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
