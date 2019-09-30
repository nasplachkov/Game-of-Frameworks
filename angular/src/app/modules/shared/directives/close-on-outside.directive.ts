import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[closeOnOutside]'
})
export class CloseOnOutsideDirective {

  @Input() public triggerClass: Array<string> = null;
  @Output() public close: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  public clickHandler(targetElement: any): void {
    let path = targetElement['path'] || (targetElement.composedPath && targetElement.composedPath());
    let clickedOnTrigger = false;
    if (this.triggerClass) {
      this.triggerClass.forEach(className => {
        clickedOnTrigger = clickedOnTrigger || (path.find(elem => elem && elem.classList && elem.classList.contains(className)));
      });
    }
    if (clickedOnTrigger) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(targetElement.target)) {
      this.close.emit();
    }
  }

}
