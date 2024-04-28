import { Component, ElementRef, HostListener, OnInit, Renderer2 ,AfterViewInit} from '@angular/core';
import Typed from 'typed.js';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../service/login.service';
import { FormBuilder } from '@angular/forms';
import ScrollReveal from 'scrollreveal';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    
  public isMenuOpen = false;
  // Accessing DOM elements directly in Angular is generally done through ElementRef and Renderer2
  constructor(private el: ElementRef, private renderer: Renderer2,
    
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    
  ) {}

  ngOnInit(): void {
    this.initTyped();
    this.initScrollReveal();
  }
  

  private initTyped() {
    const options = {
      strings: ["Welcome to Stokwise!", "Serving you since 2023","Fast Safe Storage Solutions!"],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 2000
    };
    new Typed(this.el.nativeElement.querySelector('.typedText'), options);
  }

  private initScrollReveal() {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    sr.reveal('.featured-text-card', {});
    sr.reveal('.featured-name', { delay: 100 });
    sr.reveal('.featured-text-info', { delay: 200 });
    sr.reveal('.featured-text-btn', { delay: 200 });
    sr.reveal('.social_icons', { delay: 200 });
    sr.reveal('.featured-image', { delay: 300 });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navHeader = this.el.nativeElement.querySelector('#header') as HTMLElement;
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      this.renderer.setStyle(navHeader, 'boxShadow', '0 1px 6px rgba(0, 0, 0, 0.1)');
      this.renderer.setStyle(navHeader, 'height', '70px');
      this.renderer.setStyle(navHeader, 'lineHeight', '70px');
    } else {
      this.renderer.removeStyle(navHeader, 'boxShadow');
      this.renderer.setStyle(navHeader, 'height', '90px');
      this.renderer.setStyle(navHeader, 'lineHeight', '90px');
    }
  }

  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  logInRouter(){
    this.router.navigate(['/login']);
  }



}
