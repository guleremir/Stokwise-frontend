import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrl: './are-you-sure.component.scss'
})
export class AreYouSureComponent {

  question = '';
  constructor(public dialogRef: MatDialogRef<AreYouSureComponent>){}

  

  buttonYesClick() {
    this.dialogRef.close({"result": "yes"});
  }
  buttonNoClick() {
    this.dialogRef.close({"result": "no"});
  }

}