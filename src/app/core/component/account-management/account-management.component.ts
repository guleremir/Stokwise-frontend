import { Component, OnInit } from '@angular/core';
import { Role } from '../../../shared/dto/role';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { RoleService } from '../../../shared/service/role.service';
import { User } from '../../../shared/dto/user';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss'
})
export class AccountManagementComponent implements  OnInit {
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

// // Bir rolün seçilip seçilmediğini değiştiren işlev
// toggleRoleSelection(checked: boolean, role: Role): void {
//   if (checked) {
//       // Eğer check box işaretlendi ise, seçili roller dizisine ekleyin
//       this.selectedRoles.push(role);
//   } else {
//       // Eğer check box işareti kaldırıldı ise, seçili roller dizisinden kaldırın
//       const index = this.selectedRoles.findIndex(selectedRole => selectedRole.id === role.id);
//       if (index !== -1) {
//           this.selectedRoles.splice(index, 1);
//       }
//   }
// }

pswCannotBeEmpty():boolean{
  return this.updateForm.value.password! === '' ;
}
confirmPswCannotBeEmpty():boolean{
  return this.updateForm.value.confirmPassword! === '' ;
}

}
