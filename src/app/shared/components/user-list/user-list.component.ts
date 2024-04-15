import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../dto/user';
import { UserRole } from '../../dto/userRole';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() user: User = new User(0,'','',[]);
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(
  ) {}

  deleteProduct() {
    this.delete.emit(this.user);
  }
  editProduct() {
    this.edit.emit(this.user);
  }
}
