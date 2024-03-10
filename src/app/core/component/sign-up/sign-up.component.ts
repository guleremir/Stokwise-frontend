import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {


  loginForm = this.fb.nonNullable.group({
    email: [''], //Validators eklencek.
    password: ''
  })
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) { }

  signUp(){
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    this.loginService.signUp(email, password).subscribe({
      next: (value) => {
        this.toastr.success('Successfully Sign Up');
        this.router.navigate(['/homepage']);
      },
      error: (err) => {
        this.toastr.error('Error!');
        console.error(err);
        this.loginForm.setValue({ email: '', password: '', })
        this.loginForm.patchValue({ password: '', })

      }
    });
  }

  logInRouter(){
    this.router.navigate(['/login']);
  }
}
