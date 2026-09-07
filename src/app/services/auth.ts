import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
  role: 'Admin' | 'Operator' | 'Viewer';
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'telecom_user';

  private demoUsers: { email: string; password: string; user: User }[] = [
    {
      email: 'admin@telecom.in',
      password: 'admin123',
      user: { name: 'Vikram Anand', email: 'admin@telecom.in', role: 'Admin', avatar: 'VA' },
    },
    {
      email: 'operator@telecom.in',
      password: 'ops123',
      user: { name: 'Sneha Reddy', email: 'operator@telecom.in', role: 'Operator', avatar: 'SR' },
    },
  ];

  constructor(private router: Router) {}

  login(email: string, password: string): { success: boolean; message: string } {
    const match = this.demoUsers.find(u => u.email === email && u.password === password);
    if (match) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(match.user));
      return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Invalid email or password' };
  }

  register(name: string, email: string, _password: string): { success: boolean; message: string } {
    const exists = this.demoUsers.find(u => u.email === email);
    if (exists) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser: User = { name, email, role: 'Viewer', avatar: name.slice(0, 2).toUpperCase() };
    this.demoUsers.push({ email, password: _password, user: newUser });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, message: 'Account created successfully' };
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }
}
