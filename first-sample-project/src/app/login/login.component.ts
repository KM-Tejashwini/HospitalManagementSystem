import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.username === 'admin' && this.password === '12345') {
      // Simulate successful login
      localStorage.setItem('user', JSON.stringify({ username: this.username }));
      alert('login successful');
      this.router.navigate(['/dashboard']);
    } else {
      // Simulate failed login
      alert('Invalid username or password');
    }
  }
}
