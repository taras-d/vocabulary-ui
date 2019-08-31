import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { WordsListComponent } from './components/words-list/words-list.component';
import { RandomWordComponent } from './components/random-word/random-word.component';
import { WordCreateComponent } from './components/word-create/word-create.component';
import { WordEditComponent } from './components/word-edit/word-edit.component';
import { WordDeleteComponent } from './components/word-delete/word-delete.component';
import { WordsStatsComponent } from './components/words-stats/words-stats.component';

@NgModule({
  imports: [
    SharedModule,
    VocabularyRoutingModule
  ],
  declarations: [
    VocabularyComponent,
    WordsListComponent,
    RandomWordComponent,
    WordCreateComponent,
    WordEditComponent,
    WordDeleteComponent,
    WordsStatsComponent
  ]
})
export class VocabularyModule { }
