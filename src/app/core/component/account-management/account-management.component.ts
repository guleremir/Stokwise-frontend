import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { RoleService } from '../../../shared/service/role.service';
import { LoginService } from '../../service/login.service';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss'
})
export class AccountManagementComponent implements  OnInit {
    updateForm = this.fb.nonNullable.group({
    email: "",
    oldPassword: "",
    newPassword: "",
    checkPassword: "",    
  })

  areYouSureQuestion = 'Are you sure you want to edit this user ?'

  userID = "";
  selectedRoles: string [] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private roleService: RoleService,
    private loginService: LoginService,
    private accountService: AccountService   
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    if(this.userService.editingUser != null){
      this.userID = this.userService.editingUser.id;
      this.updateForm.patchValue({
        email : this.userService.editingUser.email,
        oldPassword : this.userService.editingUser.password
      });
    } else{}
  }

  loadCurrentUser() {
    if (this.loginService.loggedIn) {
      this.userID = this.loginService.email;
      this.selectedRoles=this.loginService.roles,
      this.updateForm.patchValue({
        email: this.loginService.email, 
        oldPassword: '' 
      });
    }
  }

   submit() {
    let oldPassword = this.updateForm.get('oldPassword')!.value;
    let newPassword = this.updateForm.get('newPassword')!.value;
    this.accountService.changePassword({oldPassword, newPassword }).subscribe({
      next: (sonuc) => {
        this.toastr.info("Password Successfully Changed!");
        this.router.navigate(['/homepage/products'], { relativeTo: this.route });
      }
    });
  }

  cancel() {
    this.router.navigate(['/homepage/products']);
  }

  pswCannotBeEmpty():boolean{
    return this.updateForm.value.oldPassword! === '' ;
  }
  
  confirmPswCannotBeEmpty():boolean{
    return this.updateForm.value.checkPassword! === '' ;
  }

  editUser(){
    this.submit();
  }
}
