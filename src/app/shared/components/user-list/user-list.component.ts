import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../dto/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() loadUsersEvent=new EventEmitter<void>();
  @Input() users:  User[] =  [];

  constructor() {}
  selectedUser: User | null = null;
  areYouSureQuestion = 'Are you sure you want to delete this user ?'
  
  selectUser(user: User) {
    this.selectedUser = user;
  }
  deleteUser() {
    this.delete.emit(this.selectedUser);  
  }
  editUser(user: User) {
    this.edit.emit(user);
  }
  loadUsers(){
    this.loadUsersEvent.emit();
  }
}
