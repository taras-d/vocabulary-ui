import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { VocabularyComponent } from './vocabulary.component';
import { WordsComponent } from './words/words.component';
import { RandomWordComponent } from './random-word/random-word.component';
import { WordsCreateComponent } from './words-create/words-create.component';
import { WordEditComponent } from './word-edit/word-edit.component';

@NgModule({
  imports: [
    CommonModule,
    VocabularyRoutingModule
  ],
  declarations: [VocabularyComponent, WordsComponent, RandomWordComponent, WordsCreateComponent, WordEditComponent]
})
export class VocabularyModule { }
