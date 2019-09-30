import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {

  @Input() message: string;

  constructor(private dialog: MatDialog){
  }

  close() {
    this.dialog.closeAll();
  }

}
