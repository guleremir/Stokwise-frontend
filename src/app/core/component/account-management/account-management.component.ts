import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../shared/dto/role';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { RoleService } from '../../../shared/service/role.service';
import { User } from '../../../shared/dto/user';
import { LoginService } from '../../service/login.service';

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
    // roles: {value:this.loginService.roles}
    
  })
 

  userID = "";
  // roles: Role[]= []; 
  selectedRoles: string [] = [];


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private roleService: RoleService,
    private loginService: LoginService   
      
    
  ) { }

  ngOnInit(): void {
       
    // console.log('updateformroles',this.updateForm.value.roles)
    // this.roleService.getAllRoles().subscribe({
    //   next: (data: Role[]) => {
    //     this.roles = data;
       
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
    
    this.loadCurrentUser();

    if(this.userService.editingUser != null){
      this.userID = this.userService.editingUser.id;
      this.updateForm.patchValue({
        email : this.userService.editingUser.email,
        password : this.userService.editingUser.password
      });
    } else{}
  }

  loadCurrentUser() {
    
    if (this.loginService.loggedIn) {
      this.userID = this.loginService.email;
      this.selectedRoles=this.loginService.roles,
      this.updateForm.patchValue({
        email: this.loginService.email, 
        
        
        password: '' 
        
      });
    
    } else {
      console.log("Kullanıcı giriş yapmamış.");
    }
  }



  submit() {
    let email = this.updateForm.get('email')!.value;
    let password = this.updateForm.get('password')!.value;
    let confirmPassword = this.updateForm.get('confirmPassword')!.value;
    

    
      if (password === confirmPassword) {
        this.userService.updateUser(new User( this.userID, email, password)).subscribe({
          next: (result) => {
            this.toastr.info('User updated.');
            this.router.navigate(['/homepage/products'], { relativeTo: this.route });
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


pswCannotBeEmpty():boolean{
  return this.updateForm.value.password! === '' ;
}
confirmPswCannotBeEmpty():boolean{
  return this.updateForm.value.confirmPassword! === '' ;
}

}
