import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  error = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.credentials).subscribe(
      () => this.router.navigate(['/home']),
      () => this.error = 'Invalid email or password'
    );
  }
}
