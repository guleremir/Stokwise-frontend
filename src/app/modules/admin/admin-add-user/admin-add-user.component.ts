import { Component } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../shared/dto/user';
import { RoleService } from '../../../shared/service/role.service';
import { Role } from '../../../shared/dto/role';
import { UserRole } from '../../../shared/dto/userRole';
import { passwordCheckValidator } from '../admin-edit-user/password-validator.directive';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.scss'
})
export class AdminAddUserComponent {
  createForm = this.fb.nonNullable.group({
    email:"",
    password:["", Validators.minLength(3)],
    confirmPassword:["", Validators.minLength(3)],
    roles: [[]]
  },{validators: [passwordCheckValidator()]})
  userID = "";
  roles: Role[]= []; // Roller dizisini tanımla

  // Kullanıcıya ait seçili rolleri tutmak için bir dizi tanımlayın
  selectedRoles: Role[] = [];

  areYouSureQuestion = 'Are you sure you want to do this ?'

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private roleService : RoleService
  ) {}

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
      this.createForm.patchValue({
        email : this.userService.editingUser.email,
        password : this.userService.editingUser.password
      });
    }
  }

  submit() {
    let email = this.createForm.get('email')!.value;
    let password = (this.createForm.get('password')!.value);
    let confirmPassword = (this.createForm.get('confirmPassword')!.value);
    let selectedRoles: UserRole[] = this.selectedRoles.map(role => {
      return {
        id: role.id,
        name: role.name 
      };
    });
    // if(password == confirmPassword) {
      this.userService.addUser(new User(this.userID, email,password,selectedRoles)).subscribe({
        next: () => {
          this.toastr.info('User Successfully Created !');
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      });
    // }
    //  else {
    //   this.toastr.error('Passwords do not match !');
    // }
  }
  
  cancel() {
    this.router.navigate(['/adminPanel/users']);
  }

  addUser(){
    this.submit();
  }

  userCannotBeEmpty():boolean{
    return this.createForm.value.email! === '' || this.createForm.value.password! === '' || this.createForm.value.confirmPassword! === ''  ;
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
    return this.createForm.value.password! === '' ;
  }
  confirmPswCannotBeEmpty():boolean{
    return this.createForm.value.confirmPassword! === '' ;
  }

  emailIsRequired(): boolean {
    const emailControl = this.createForm.get('email');
    if (emailControl && emailControl.value) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return !emailPattern.test(emailControl.value);
    }
    return true;
  }

  disabledButton(): boolean {
    return !this.emailIsRequired();
  }
  
}
