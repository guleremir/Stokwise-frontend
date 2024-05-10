import { Component } from '@angular/core';
import { User } from '../../../shared/dto/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/service/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.scss'
})
export class AdminUserManagementComponent {
  users: User[] = [];
  searchText: string = ''; // Arama metni için değişken eklendi
  selectedUser: User | null = null;
  // myGroup: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
  ) { 
    // this.myGroup = new FormGroup({
    //   searchText: new FormControl()
    // });
  }
  //Component çağrıldığında çalışan method.
  ngOnInit(): void {
    //ProductService'den getAllProducts() methodunu çağrıyor. Tüm productları döndürüyor.
    // this.userService.getAllUsers().subscribe({
    //   next: (users => {
    //     console.log(users);
    //     this.users = users;
    //   })
    // });
    this.loadUsers();
  }

  loadUsers(): void {
    // ProductService'den getAllProducts() methodunu çağrıyor. Tüm productları döndürüyor.
    // this.userService.getAllUsers().subscribe({
    //   next: (users => {
    //     console.log(users);
    //     this.users = users;
    //   })
    // });
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      } 
    )
  }

  addUser(){
    this.userService.editingUser = null;
    this.router.navigate(['addUser'], { relativeTo: this.route });
  }
  editUser(user: User) {
    this.userService.editingUser = user;
    this.router.navigate(['editUser'], { relativeTo: this.route });
  }
  selectUser(user: User) {
    this.selectedUser = user;
  }
  deleteUser(user: User) {
    if (!user) {
      console.error("No user selected for deletion !");
      return;
    }
    this.userService.deleteUser(user).subscribe({
      next: () => {
        this.users = this.users.filter(u => u !== user);
        this.toastr.success("User Successfully Deleted !");
      },
      error: (err) => {
        console.error("Failed to delete user: ", err);
      }
    });
  }
  // Ürünleri filtrelemek için fonksiyon eklendi
  filterUsers() {
    let filteredUsers = this.users;
    if(this.searchText){
      filteredUsers = filteredUsers.filter(user => 
        user.email.toLowerCase().includes(this.searchText.toLowerCase())
      ); 
    }
    return filteredUsers;
    // return this.users.filter(user => {
    //   return user.email.toLowerCase().includes(this.searchText.toLowerCase());
    // });
  }
}
