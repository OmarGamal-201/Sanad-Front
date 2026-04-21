import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs'; // ضفنا BehaviorSubject هنا

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'client' | 'provider' | 'admin';
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API_URL = 'http://localhost:5000/api/auth';

  // 1. إنشاء القناة (BehaviorSubject) وإعطاؤها القيمة المبدئية من الـ LocalStorage باستخدام دالة getUser() بتاعتك
  private userSubject = new BehaviorSubject<LoginResponse['user'] | null>(this.getUser());

  // 2. المتغير ده هو اللي النافبار هيعمل Subscribe عليه عشان يسمع التغييرات لحظة بلحظة
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, password }).pipe(
      tap(res => {
        if (res.success) {
          // حفظ الداتا في المتصفح
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));

          // 3. تحديث القناة ببيانات اليوزر الجديد عشان النافبار (أو أي كومبوننت تاني) يحس بيها فوراً
          this.userSubject.next(res.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 4. تصفير القناة عشان النافبار يرجع لزراير الـ Login والـ Register
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): LoginResponse['user'] | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
