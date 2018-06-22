import { Component, OnInit, OnDestroy, TemplateRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { TemplateModalConfig, SuiModalService, SuiActiveModal } from 'ng2-semantic-ui';

import { notEmpty } from '../../core/validators';
import { ObservableManager, getErrorMessage } from '../../core/utils';
import { AppService, WordsService } from '../../core/services';

@Component({
  selector: 'v-word-create',
  templateUrl: './word-create.component.html',
  styleUrls: ['./word-create.component.less']
})
export class WordCreateComponent implements OnInit, OnDestroy {

  @Output() complete = new EventEmitter();

  @ViewChild('modalTemplate') modalTemplateRef: TemplateRef<any>;
  @ViewChild('form') formRef: ElementRef;

  loading: boolean;

  wordsForm: FormArray;

  modal: SuiActiveModal<any, any, any>;

  om: ObservableManager;

  constructor(
    private fb: FormBuilder,
    private suiModalService: SuiModalService,
    private appService: AppService,
    private wordsService: WordsService
  ) {
    this.om = new ObservableManager({

      createWord: {
        create: () => {
          this.loading = true;
          return this.wordsService.createWord(this.wordsForm.value);
        },
        next: res => {
          this.appService.pushMessage({
            text: `Created: ${res.inserted}, duplicates: ${res.duplicates}`,
            type: 'success'
          });

          this.loading = false;
          this.modal.approve(null);
          this.complete.emit();
        }
      }

    }, {

      error: (name, err) => {
        this.appService.pushMessage({
          header: 'Error', text: getErrorMessage(err), type: 'error'
        });
        this.loading = false;
      }

    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.om.unsubAll();
  }

  open(): void {
    this.buildForm();

    const config = new TemplateModalConfig(this.modalTemplateRef);
    config.isInverted = true;
    config.size = 'small';
    config.mustScroll = true;

    this.modal = this.suiModalService.open(config);
    this.modal.onDeny(() => {
      this.wordsForm = null;
      this.om.unsubAll();
    });
  }

  buildForm(): void {
    this.wordsForm = this.fb.array([]);
    this.onAdd();
  }

  onAdd(): void {
    this.wordsForm.push(
      this.fb.group({
        text: ['', notEmpty],
        translation: ''
      })
    );
    this.focusAndScrollToLastField();
  }

  onDelete(index: number): void {
    this.wordsForm.removeAt(index);
  }

  onCancel(): void {
    this.modal.deny(null);
  }

  onSave(): void {
    this.om.invoke('createWord');
  }

  focusAndScrollToLastField(): void {
    setTimeout(() => {
      const form = this.formRef.nativeElement as HTMLElement;
      form.scrollTop = form.scrollHeight;

      const field = form.querySelector('.fields:last-child .field:first-child textarea') as HTMLTextAreaElement;
      if (field) {
        setTimeout(() => field.focus(), 100);
      }
    });
  }

}
