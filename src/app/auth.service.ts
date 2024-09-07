import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { username: 'super', password: '123', role: 'SuperAdmin' },
    { username: 'admin', password: 'admin123', role: 'GroupAdmin' },
    { username: 'user', password: 'user123', role: 'User' } 
  ];

  constructor(private router: Router) {}

  login(username: string, password: string): string | null {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify({ username: user.username, role: user.role }));
      this.redirectBasedOnRole(user.role); 
      return user.role;
    } else {
      return null;
    }
  }

  getUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem('user');
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'SuperAdmin':
        this.router.navigate(['/super-admin-dashboard']);
        break;
      case 'GroupAdmin':
        this.router.navigate(['/group-admin-dashboard']);
        break;
      case 'User':
        this.router.navigate(['/user-dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}

