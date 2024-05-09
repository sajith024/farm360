import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/auth/login.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'farm360-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  loginForm!: FormGroup;
  isLoading: boolean = false;
  isPasswordHidden: boolean = true;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  togglePassword() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.statusCode === 200 && res.success) {
            this.router.navigate(['dashboard']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.toastr.error('Login failed');
          this.isLoading = false;
        },
      });
    }
  }
}
