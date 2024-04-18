import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { User } from '../../../shared/dto/user';
import { RoleService } from '../../../shared/service/role.service';
import { UserRole } from '../../../shared/dto/userRole';
import { Role } from '../../../shared/dto/role';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrl: './admin-edit-user.component.scss'
})
export class AdminEditUserComponent  implements OnInit {
  updateForm = this.fb.nonNullable.group({
    email: "",
    password: "",
    confirmPassword: "",
    roles: [[]]
  })
  userID = 0;
  roles: Role[]= []; // Roller dizisini tanımla

  // Kullanıcıya ait seçili rolleri tutmak için bir dizi tanımlayın
  selectedRoles: Role[] = [];


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {

    this.roleService.getAllRoles().subscribe({
      next: (data: Role[]) => {
        this.roles = data;
        console.log(this.roles);
      },
      error: (error) => {
        console.log(error);
      }
    });
    
    if(this.userService.editingUser != null){
      this.userID = this.userService.editingUser.id;
      this.updateForm.patchValue({
        email : this.userService.editingUser.email,
        password : this.userService.editingUser.password
      });
    } else{}
  }

  submit() {
    let email = this.updateForm.get('email')!.value;
    let password = this.updateForm.get('password')!.value;
    let confirmPassword = this.updateForm.get('confirmPassword')!.value;
    let roles = this.updateForm.get('roles')!.value; // Rollerin alınması

    
      if (password === confirmPassword) {
        this.userService.updateUser(new User(this.userID, email, password, roles)).subscribe({
          next: (result) => {
            this.toastr.info('User updated.');
            this.router.navigate(['..'], { relativeTo: this.route });
          },
          error: (error) => {
            this.toastr.error('An error occurred while updating user.');
          }
        });
      } else {
        this.toastr.error('Passwords do not match.');
      }
  }

  cancel() {
    this.router.navigate(['/homepage/products']);
  }
}
