import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isMobileMenuOpen = false;
  isLoggedIn = false;
  userName = '';

  constructor(private router: Router) { }

  // الدالة دي بتشتغل أول ما النافبار يظهر على الشاشة
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // بنشيك إذا كان في بيانات يوزر محفوظة في المتصفح
  checkLoginStatus() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.isLoggedIn = true;
      this.userName = user.name; // بناخد الاسم من الأوبجيكت
    }
  }

  // دالة تسجيل الخروج
  logout() {
    // 1. نمسح الداتا من المتصفح
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 2. نرجع المتغيرات لحالتها الأصلية
    this.isLoggedIn = false;
    this.userName = '';

    // 3. نقفل منيو الموبايل (لو مفتوحة) ونوجهه للرئيسية أو اللوجين
    this.isMobileMenuOpen = false;
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
