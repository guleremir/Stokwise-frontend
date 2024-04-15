import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../core/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../core/service/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrl: './admin-account.component.scss'
})
export class AdminAccountComponent {
  accountForm = this.fb.nonNullable.group({
    oldPassword: "",
    newPassword: ["", [ Validators.required, Validators.minLength(3)] ],
    checkPassword: "",
  }, {validators: []});

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,

  ) {}

  submit() {
    let oldPassword = this.accountForm.get('oldPassword')!.value;
    let newPassword = this.accountForm.get('newPassword')!.value;
    this.accountService.changePassword({oldPassword, newPassword }).subscribe({
      next: (sonuc) => {
        console.log(sonuc);
        this.toastr.info("Şifre değiştirilmiştir.");
        this.router.navigate(['..'], { relativeTo: this.route });
      }
    });
  }
}

