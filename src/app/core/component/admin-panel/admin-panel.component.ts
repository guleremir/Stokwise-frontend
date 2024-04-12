import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  ) { }
  ngOnInit(): void {
    this.router.events.subscribe({
      next: (event) => {
        console.log(event);
        if (event instanceof NavigationEnd) {
          this.url = event.url;
        }
      }
    });
  }
}
