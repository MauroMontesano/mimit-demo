import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputComponent } from '@engular/forms-base';

@Component({
  selector: 'eaf-input-upload',
  templateUrl: './input-upload.component.html',
  styleUrls: ['./input-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUploadComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputUploadComponent),
      multi: true,
    },
  ],
})
export class InputUploadComponent extends BaseInputComponent {
  @Input() acceptedTypes: string;
  @Input() name: string;
  @Input() multiple: boolean;
  @Input() fileName: string;

  @Output() fileToUpload: EventEmitter<any> = new EventEmitter();

  writeValue(textInput: any): void {
    this.log.info('writeValue ' + this.id + ':', textInput);
    this.value = textInput;
  }

  inputTypeName(): string {
    return 'UploadComponent';
  }

  ngOnInitForChildren() {
    // non faccio nulla
  }

  extractInformationFromInternalInput($event: Event): File[] | undefined {
    const input = $event.target as HTMLInputElement;
    if (!input.files || !input.files?.length) {
      return;
    }
    const files: File[] = [];
    for (const fileId in input.files) {
      if (input.files[fileId] instanceof File) {
        files.push(input.files[fileId]);
      }
    }
    return files;
  }

  onFileSelected($event: Event) {
    this.value = this.extractInformationFromInternalInput($event);
    if (this.onChangeCallBack) {
      this.onChangeCallBack(this.value);
    }
    this.fileToUpload.emit(this.value);
  }
}
