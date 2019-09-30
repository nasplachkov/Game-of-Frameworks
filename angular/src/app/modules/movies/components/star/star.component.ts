import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
})
export class StarComponent {

  @Input() isFilled: boolean = false;
  @Input() isHovered: boolean = false;
  @Input() isDisabled: boolean = false;

  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() mouseEnter: EventEmitter<any> = new EventEmitter();
  @Output() mouseLeave: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleClick() {
    this.onClick.emit();
  }

  onMouseEnter() {
    this.mouseEnter.emit();
  }

  onMouseLeave() {
    this.mouseLeave.emit();
  }

}
