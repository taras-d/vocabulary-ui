import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { WordsListComponent } from './components/words-list/words-list.component';
import { RandomWordsComponent } from './components/random-words/random-words.component';
import { WordCreateComponent } from './components/word-create/word-create.component';
import { WordEditComponent } from './components/word-edit/word-edit.component';
import { WordsStatsComponent } from './components/words-stats/words-stats.component';

@NgModule({
  imports: [
    SharedModule,
    VocabularyRoutingModule
  ],
  declarations: [
    VocabularyComponent,
    WordsListComponent,
    RandomWordsComponent,
    WordCreateComponent,
    WordEditComponent,
    WordsStatsComponent
  ]
})
export class VocabularyModule { }
