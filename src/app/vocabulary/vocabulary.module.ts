import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { VocabularyComponent } from './vocabulary.component';
import { WordsComponent } from './words/words.component';
import { RandomWordComponent } from './random-word/random-word.component';
import { WordsCreateComponent } from './words-create/words-create.component';
import { WordEditComponent } from './word-edit/word-edit.component';

@NgModule({
  imports: [
    SharedModule,
    VocabularyRoutingModule
  ],
  declarations: [
    VocabularyComponent,
    WordsComponent,
    RandomWordComponent,
    WordsCreateComponent,
    WordEditComponent
  ]
})
export class VocabularyModule { }
