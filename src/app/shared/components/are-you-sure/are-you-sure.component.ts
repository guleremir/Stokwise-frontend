import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../dto/product';
import { Category } from '../../dto/category';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrl: './are-you-sure.component.scss'
})
export class AreYouSureComponent {

  selectedId?: string = undefined;

  @Output() areYouSureEvent =  new EventEmitter();
  @Input() areYouSureQuestion = '';

  buttonYesClick(id: string) {
    this.areYouSureEvent.emit(id);
  }
  buttonNoClick() {
    this.areYouSureEvent.emit('no');
  }

}