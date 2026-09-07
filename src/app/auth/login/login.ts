import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }
    this.loading = true;
    this.error = '';

    setTimeout(() => {
      const result = this.auth.login(this.email, this.password);
      this.loading = false;
      if (result.success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = result.message;
      }
    }, 800);
  }

  fillDemo(email: string, pass: string) {
    this.email = email;
    this.password = pass;
  }
}
