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
  userID = "";
  roles: Role[]= []; // Roller dizisini tanımla

  // Kullanıcıya ait seçili rolleri tutmak için bir dizi tanımlayın
  selectedRoles: Role[] = [];

  areYouSureQuestion = 'Are you sure you want to edit this user ?'

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
    let selectedRoles: UserRole[] = this.selectedRoles.map(role => {
      return {
        id: role.id,
        name: role.name 
      };
    });
    
      if (password === confirmPassword) {
        this.userService.updateUser(new User(this.userID, email, password, selectedRoles)).subscribe({
          next: (result) => {
            this.toastr.info('User Successfully Saved !');
            this.router.navigate(['..'], { relativeTo: this.route });
          },
          error: (error) => {
            this.toastr.error('An error occurred while updating user !');
          }
        });
      } else {
        this.toastr.error('Passwords do not match !');
      }
  }

  cancel() {
    this.router.navigate(['/adminPanel/users']);
  }

// Seçilen rollerin kontrolü
isSelected(role: Role): boolean {
  return this.selectedRoles.some(selectedRole => selectedRole.id === role.id);
}

// Seçilen rolleri değiştirme
toggleSelection(role: Role): void {
  const index = this.selectedRoles.findIndex(selectedRole => selectedRole.id === role.id);
  if (index === -1) {
    this.selectedRoles.push(role);
  } else {
    this.selectedRoles.splice(index, 1);
  }
}

pswCannotBeEmpty():boolean{
  return this.updateForm.value.password! === '' ;
}
confirmPswCannotBeEmpty():boolean{
  return this.updateForm.value.confirmPassword! === '' ;
}

editUser(){
  this.submit();
}


editUserCannotBeEmpty():boolean{
  return this.updateForm.value.email! === '' || this.updateForm.value.password! === '' || this.updateForm.value.confirmPassword! === '' ;
}

}