import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating-input',
  templateUrl: './rating-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true
    }
  ]
})
export class RatingInputComponent implements ControlValueAccessor {

  @Input() disabled: boolean = false;

  public hoverIndex: number = -1;
  public STARS_COUNT = 5;
  public val = 0;

  // create an array to hold the filled state of each star
  public stars = Array(this.STARS_COUNT).fill({ filled: false });

  onChange: any = (val) => {
  };

  onTouch: any = () => {
  };

  set value(val) {
    this.val = val;
    const roundValue = Math.floor(Number(val));
    this.stars = this.stars.map((star, index) => {
      return {
        ...star,
        filled: index < roundValue
      };
    });
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

  public handleMouseEnter(index): void {
    this.hoverIndex = index;
  }

  public handleMouseLeave(): void {
    this.hoverIndex = -1;
  }
}
