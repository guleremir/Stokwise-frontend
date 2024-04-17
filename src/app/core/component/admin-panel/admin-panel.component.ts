import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit{
  url = "";
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService
  ) { }
  ngOnInit(): void {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.url = event.url;
        }
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.toastr.success("Logout Successfuly!");
    this.router.navigate(['/login']);
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
}

}
