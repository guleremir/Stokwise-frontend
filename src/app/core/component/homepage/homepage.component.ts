import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  @ViewChild('navbarToggler') navbarToggler!: ElementRef<HTMLButtonElement>;
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef<HTMLDivElement>;

  constructor(
    private loginService : LoginService,
    private router : Router,
    public route : ActivatedRoute
  ){
    
  }
  
 
  closeNavbar(): void {
    if (this.navbarCollapse.nativeElement.classList.contains('show')) {
      this.navbarCollapse.nativeElement.classList.remove('show');
    }
  } 
  
  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }
  goMenu() {
    this.router.navigate(['/menu']);
  }
}
