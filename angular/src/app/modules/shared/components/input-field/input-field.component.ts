import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() controlName: string;
  @Input() controlType: string;
  @Input() formGroup: FormGroup;
  @Input() controlLabel: string;

  public val: any;

  onChange: any = (val) => {
  };

  onTouch: any = () => {
  };

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.formGroup.get(this.controlName).setValue(this.val);
    this.onChange(val);
    this.onTouch(val);
  }

  // this method sets the value programmatically
  writeValue(value: any) {
    this.value = value
  }

  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn
  }

  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  setDisabledState(isDisabled: boolean): void {
  }


}
