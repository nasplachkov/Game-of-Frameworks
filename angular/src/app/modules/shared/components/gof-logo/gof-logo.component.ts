import { Component, Input } from '@angular/core';

const SIMPLE_WIDTH = 206;
const SIMPLE_HEIGHT = 63;

@Component({
  selector: 'app-gof-logo',
  templateUrl: './gof-logo.component.html'
})
export class GofLogoComponent {

  @Input() white: boolean = false;
  @Input() simple: boolean = false;

  @Input() style: any = {
    width: `${SIMPLE_WIDTH}px`,
    height: `${SIMPLE_HEIGHT}px`
  };

}
