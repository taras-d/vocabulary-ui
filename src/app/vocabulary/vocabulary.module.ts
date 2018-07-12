import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { VocabularyComponent } from './vocabulary.component';
import { WordsComponent } from './words/words.component';
import { RandomWordComponent } from './random-word/random-word.component';
import { WordCreateComponent } from './word-create/word-create.component';
import { WordEditComponent } from './word-edit/word-edit.component';
import { WordsStatsComponent } from './words-stats/words-stats.component';

@NgModule({
  imports: [
    SharedModule,
    VocabularyRoutingModule
  ],
  declarations: [
    VocabularyComponent,
    WordsComponent,
    RandomWordComponent,
    WordCreateComponent,
    WordEditComponent,
    WordsStatsComponent
  ]
})
export class VocabularyModule { }
