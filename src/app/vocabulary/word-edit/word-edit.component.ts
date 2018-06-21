import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuiModalService, TemplateModalConfig, SuiActiveModal } from 'ng2-semantic-ui';
import * as _ from 'lodash';

import { notEmpty } from '../../core/validators';
import { ObservableManager } from '../../core/utils';
import { WordsService } from '../../core/services';

@Component({
  selector: 'v-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.less']
})
export class WordEditComponent implements OnInit, OnDestroy {

  @ViewChild('modalTemplate') modalTemplateRef: TemplateRef<any>;
  @ViewChild('form') formRef: ElementRef;

  @Output() complete = new EventEmitter();

  loading: boolean;

  word: any;
  wordForm: FormGroup;

  modal: SuiActiveModal<any, any, any>;

  om: ObservableManager;

  constructor(
    private fb: FormBuilder,
    private suiModalService: SuiModalService,
    private wordsService: WordsService
  ) {
    this.om = new ObservableManager({

      updateWord: {
        create: () => {
          this.loading = true;
          return this.wordsService.updateWord(this.word._id, this.wordForm.value);
        },
        next: () => {
          this.loading = false;
          this.modal.approve(null);
          this.complete.emit();
        }
      }

    }, {

      error: (name, err) => {
        this.loading = false;
        console.error(err);
      }

    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.om.unsubAll();
  }

  buildForm(data: any): void {
    this.wordForm = this.fb.group({
      text: [data.text, notEmpty],
      translation: [data.translation]
    });
  }

  open(word: any): void {
    this.word = _.cloneDeep(word);

    this.buildForm(word);

    const config = new TemplateModalConfig(this.modalTemplateRef);
    config.isInverted = true;
    config.size = 'tiny';
    config.mustScroll = true;

    this.modal = this.suiModalService.open(config);
    this.modal.onDeny(() => {
      this.word = this.wordForm = null;
      this.om.unsubAll();
    });

    this.focusTextField();
  }

  onSave(): void {
    this.om.invoke('updateWord');
  }

  onCancel(): void {
    this.modal.deny(null);
  }

  focusTextField(): void {
    setTimeout(() => {
      const form = this.formRef.nativeElement as HTMLFormElement;
      const field = form.querySelector('.field:first-child textarea') as HTMLTextAreaElement;
      if (field) {
        field.focus();
      }
    }, 100);
  }

}
