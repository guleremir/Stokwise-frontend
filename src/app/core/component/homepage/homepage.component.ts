import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(
    private loginService : LoginService,
    private router : Router,
    public route : ActivatedRoute
  ){

  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
