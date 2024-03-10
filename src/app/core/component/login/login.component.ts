import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { EmitterVisitorContext } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

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



  submit() {
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    console.log(email);
    console.log(password);
    this.loginService.login(email, password).subscribe({
      next: (value) => {
        this.toastr.success('Successfully Log In');
        let isAdmin = this.loginService.userHasRole('admin');
        this.router.navigateByUrl(isAdmin ? 'adminPanel' : 'homepage');
      },
      error: (err) => {
        this.toastr.error('Wrong email or password!');
        this.loginForm.patchValue({ email: '', password: '' });
        console.error(err);
      }
    })
  }

  signUpRouter(){
    this.router.navigate(['/signup']);
  }

}
