import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  onLogin(): void {
    this.error = '';
    if (!this.username || !this.password) {
      this.error = 'Vui lòng nhập tài khoản và mật khẩu';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      if (this.auth.login(this.username, this.password)) {
        this.router.navigateByUrl('/');
      } else {
        this.error = 'Tài khoản hoặc mật khẩu không đúng';
      }
    }, 500);
  }
}
