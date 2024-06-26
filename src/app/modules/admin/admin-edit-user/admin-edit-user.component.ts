import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../shared/dto/user';
import { RoleService } from '../../../shared/service/role.service';
import { UserRole } from '../../../shared/dto/userRole';
import { Role } from '../../../shared/dto/role';
import { passwordCheckValidator } from '../../../shared/components/password/password-validator.directive';


@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrl: './admin-edit-user.component.scss'
})
export class AdminEditUserComponent  implements OnInit {
  updateForm = this.fb.nonNullable.group({
    email: "",
    password: ["", Validators.minLength(3)],
    confirmPassword: ["", Validators.minLength(3)],
    roles: [[]]
  },{validators: [passwordCheckValidator()]})
  userID = "";
  roles: Role[]= [];

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
    }
  }

  submit() {
    let email = this.updateForm.get('email')!.value;
    let password = this.updateForm.get('password')!.value;
    let selectedRoles: UserRole[] = this.selectedRoles.map(role => {
      return {
        id: role.id,
        name: role.name 
      };
    });
      this.userService.updateUser(new User(this.userID, email, password, selectedRoles)).subscribe({
         next: (result) => {
           this.toastr.info('User Successfully Saved !');
           this.router.navigate(['..'], { relativeTo: this.route });
         },
         error: (error) => {
           this.toastr.error('An error occurred while updating user !');
         }
    });
  }

  cancel() {
    this.router.navigate(['/adminPanel/users']);
  }

  isSelected(role: Role): boolean {
    return this.selectedRoles.some(selectedRole => selectedRole.id === role.id);
  }

  toggleSelection(role: Role): void {
    const index = this.selectedRoles.findIndex(selectedRole => selectedRole.id === role.id);
    if (index === -1) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles.splice(index, 1);
    }
  }

  editUser(){
    this.submit();
  }
}