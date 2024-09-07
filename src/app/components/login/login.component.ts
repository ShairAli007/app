import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const role = this.authService.login(this.username, this.password);
    if (role) {
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
    } else {
      alert('Login failed. Please check your username and password.');
    }
  }
}
