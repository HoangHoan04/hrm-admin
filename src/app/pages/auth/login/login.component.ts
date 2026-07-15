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
  isModalVisible = false;
  rememberMe = false;

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  openContactModal(): void {
    this.isModalVisible = true;
  }

  closeContactModal(): void {
    this.isModalVisible = false;
  }

  onLogin(): void {
    this.error = '';
    if (!this.username || !this.password) {
      this.error = 'Vui lòng nhập tài khoản và mật khẩu';
      return;
    }
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.mustChangePassword) {
          this.router.navigateByUrl('/auth/change-password');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error: (err) => {
        this.loading = false;
        this.error =
          typeof err.error === 'string' ? err.error : 'Tài khoản hoặc mật khẩu không đúng';
      },
    });
  }
}
