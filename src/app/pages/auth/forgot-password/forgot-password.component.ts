import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  @ViewChildren('otpBox') otpBoxes!: QueryList<ElementRef<HTMLInputElement>>;

  step: 1 | 2 | 3 = 1;
  email = '';
  otp: string[] = ['', '', '', '', '', ''];
  newPassword = '';
  confirmPassword = '';
  showNewPassword = false;
  showConfirmPassword = false;
  loading = false;
  error = '';
  otpTimer = 60;
  private otpInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const path = this.router.url.split('?')[0];
    if (path === '/auth/reset-password') {
      this.step = 2;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  get isOtpExpired(): boolean {
    return this.otpTimer <= 0;
  }

  get timerDisplay(): string {
    const m = Math.floor(this.otpTimer / 60);
    const s = this.otpTimer % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  get otpValue(): string {
    return this.otp.join('');
  }

  requestOtp(): void {
    this.error = '';
    if (!this.email) {
      this.error = 'Vui lòng nhập email của bạn';
      return;
    }
    this.step = 2;
    setTimeout(() => this.focusBox(0), 0);
    this.startTimer();
  }

  onOtpInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '');
    this.otp[index] = val.slice(-1);
    input.value = this.otp[index];
    if (this.otp[index] && index < 5) {
      this.focusBox(index + 1);
    }
  }

  onOtpKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      this.focusBox(index - 1);
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      this.focusBox(index - 1);
    }
    if (event.key === 'ArrowRight' && index < 5) {
      this.focusBox(index + 1);
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    const data = event.clipboardData?.getData('text') || '';
    const digits = data.replace(/\D/g, '').slice(0, 6);
    if (!digits) return;
    event.preventDefault();
    for (let i = 0; i < digits.length; i++) {
      this.otp[i] = digits[i];
    }
    const nextIndex = Math.min(digits.length, 5);
    this.focusBox(nextIndex);
  }

  verifyOtp(): void {
    this.error = '';
    if (this.otpValue.length < 6) {
      this.error = 'Vui lòng nhập đủ mã OTP';
      return;
    }
    this.step = 3;
    this.clearTimer();
  }

  resendOtp(): void {
    this.otp = ['', '', '', '', '', ''];
    this.otpTimer = 60;
    this.startTimer();
    setTimeout(() => this.focusBox(0), 0);
  }

  onResetPassword(): void {
    this.error = '';
    if (!this.newPassword || this.newPassword.length < 6) {
      this.error = 'Mật khẩu phải có ít nhất 6 ký tự';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Mật khẩu xác nhận không khớp';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('/auth/login');
    }, 800);
  }

  goBack(): void {
    this.error = '';
    this.clearTimer();
    if (this.step > 1) {
      this.step = (this.step - 1) as 1 | 2 | 3;
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  private focusBox(index: number): void {
    const boxes = this.otpBoxes;
    if (boxes && boxes.get(index)) {
      boxes.get(index)!.nativeElement.focus();
    }
  }

  private startTimer(): void {
    this.clearTimer();
    this.otpInterval = setInterval(() => {
      if (this.otpTimer > 0) {
        this.otpTimer--;
      } else {
        this.clearTimer();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.otpInterval) {
      clearInterval(this.otpInterval);
      this.otpInterval = null;
    }
  }
}
