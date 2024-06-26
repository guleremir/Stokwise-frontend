import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  areYouSureQuestion = 'Are you sure you want to edit this password ?'

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
    let checkPassword = this.accountForm.get('checkPassword')!.value;
    if(newPassword === checkPassword){
      this.accountService.changePassword({oldPassword, newPassword }).subscribe({
        next: (sonuc) => {
          this.toastr.info("Password Successfully Changed!");
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      });
    }
    else{
      this.toastr.error('Passwords do not match !');
    }
  }

  cancel() {
    this.router.navigate(['/adminPanel/products']);
  }
   
  edit(){
    this.submit();
  }

  editCannotBeEmpty():boolean{
    return this.accountForm.value.oldPassword! === '' || this.accountForm.value.newPassword! === '' || this.accountForm.value.checkPassword! === '';
  }
}

