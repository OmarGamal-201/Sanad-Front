import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'; // استيراد السيرفيس

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isMobileMenuOpen = false;
  isLoggedIn = false;
  userName = '';

  // حقن السيرفيس في الـ constructor
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    // الاستماع لأي تغيير في حالة اليوزر من السيرفيس
    this.loginService.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.name;
      } else {
        this.isLoggedIn = false;
        this.userName = '';
      }
    });
  }

  logout() {
    // 1. بننادي على دالة الخروج من السيرفيس
    // (وهي هتقوم بمسح الـ localStorage وتصفير القناة أوتوماتيك)
    this.loginService.logout();

    // 2. بنقفل قائمة الموبايل لو كانت مفتوحة
    this.isMobileMenuOpen = false;

    // 3. بنوجه المستخدم لصفحة تسجيل الدخول
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToHowItWorks() {
    this.router.navigate(['/about']);
  }
}
