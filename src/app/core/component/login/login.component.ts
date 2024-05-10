import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', Validators.required],  
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) { }

  submit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      
      // email veya password null ise hata göster.
      if (email == null || password == null) {
        this.toastr.error('Email or password cannot be null !');
        return;
      }
  
      this.loginService.login(email, password).subscribe({
        next: (value) => {
          this.toastr.success('Successfully Logged In !');
          let isAdmin = this.loginService.userHasRole('admin');
          this.router.navigateByUrl(isAdmin ? '/adminPanel' : '/homepage/products');
        },
        error: (err) => {
          this.toastr.error('Wrong email or password !');
          this.loginForm.patchValue({ email: '', password: '' });
          console.error(err);
        }
      });
    } else {
      this.toastr.error('Please fill in all required fields correctly !');
    }
  }
  backToMenu() {
    this.router.navigate(['/menu']);
  }
}



