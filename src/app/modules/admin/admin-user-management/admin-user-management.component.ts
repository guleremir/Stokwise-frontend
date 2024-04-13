import { Component } from '@angular/core';
import { User } from '../../../shared/dto/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.scss'
})
export class AdminUserManagementComponent {
  users: User[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  //Component çağrıldığında çalışan method.
  ngOnInit(): void {
    //ProductService'den getAllProducts() methodunu çağrıyor. Tüm productları döndürüyor.
    this.userService.getAllUsers().subscribe({
      next: (users => {
        console.log(users);
        this.users = users;
      })
    });
  }

  addUser(){
    this.router.navigate(['addUser'], { relativeTo: this.route });
  }

  editUser(user: User) {
    this.userService.editingUser = user;
    console.log(user);
    this.router.navigate(['editUser'], { relativeTo: this.route });
  }

  deleteUser(user: User) {
    
    this.userService.deleteUser(user).subscribe({
      next: () => {
        this.users = this.users.filter(u => u !== user);
        this.toastr.success("User deleted successfully");
       
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
