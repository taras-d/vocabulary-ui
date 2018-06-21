import { Component, OnInit, OnDestroy, TemplateRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { TemplateModalConfig, SuiModalService, SuiActiveModal } from 'ng2-semantic-ui';

import { notEmpty } from '../../core/validators';
import { ObservableManager } from '../../core/utils';
import { WordsService } from '../../core/services';

@Component({
  selector: 'v-word-create',
  templateUrl: './word-create.component.html',
  styleUrls: ['./word-create.component.less']
})
export class WordCreateComponent implements OnInit, OnDestroy {

  @Output() complete = new EventEmitter();

  @ViewChild('modalTemplate') modalTemplateRef: TemplateRef<any>;

  loading: boolean;

  wordsForm: FormArray;

  modal: SuiActiveModal<any, any, any>;

  om: ObservableManager;

  constructor(
    private fb: FormBuilder,
    private suiModalService: SuiModalService,
    private wordsService: WordsService
  ) {
    this.om = new ObservableManager({

      createWord: {
        create: () => {
          this.loading = true;
          return this.wordsService.createWord(this.wordsForm.value);
        },
        next: res => {
          console.log(res);
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

  open(): void {
    this.buildForm();

    const config = new TemplateModalConfig(this.modalTemplateRef);
    config.isInverted = true;
    config.size = 'small';

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
  }

  onDelete(index: number): void {
    this.wordsForm.removeAt(index);
  }

  onSave(): void {
    this.om.invoke('createWord');
  }

}
