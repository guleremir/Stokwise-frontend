import { Component } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { User } from '../../../shared/dto/user';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.scss'
})
export class AdminAddUserComponent {
  createForm = this.fb.nonNullable.group({
    email:"",
    password:"",
    confirmPassword:""
  })
  userID = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}


  submit() {
    let email = this.createForm.get('email')!.value;
    let password = (this.createForm.get('password')!.value);
    let confirmPassword = (this.createForm.get('confirmPassword')!.value);
    if(password == confirmPassword) {
      this.userService.addUser(new User(this.userID, email,password)).subscribe({
        next: (result) => {
          this.toastr.info('User created.');
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      });
    } else {
      this.toastr.error('Passwords do not match.');
    }
  }

  cancel() {
    this.router.navigate(['/adminPanel/users']);
  }
}
