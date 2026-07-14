import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'auth_user';

  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.KEY);
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123') {
      localStorage.setItem(this.KEY, username);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
  }
}
