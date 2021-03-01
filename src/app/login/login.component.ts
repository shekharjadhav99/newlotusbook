import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ICaptchaData } from './types/captcha-data';

import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';
import { GenericResponse } from '../shared/types/generic-response';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imageSrc: any;

  loginForm: FormGroup;
  isPasswordVisible: boolean = false;
  loginStatus: GenericResponse<any>;
  isSubmitted: boolean = false;
  errorMsg: string;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getImg();
    this.loginForm = this.formBuilder.group({
      userName: this.formBuilder.control('', Validators.required),
      password: ['', Validators.required],
      captcha: ['', Validators.required],
      log: ['', Validators.required],
    });
  }

  getImg() {
    this.loginService
      .getImg()
      .subscribe((response: { img: string; log: string }) => {
        this.imageSrc = response.img;
        document
          .getElementById('authenticateImage')
          .setAttribute('src', this.getSecureImage(response.img));
        this.loginForm.get('log').setValue(response.log);
      });
  }

  getSecureImage(img) {
    return `data:image/jpeg;base64, ${img}`;
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .subscribe((res: GenericResponse<any>) => {
          this.loginStatus = res;
          if (res.errorCode === 0) {
            localStorage.clear();
            this.tokenService.setToken(res.result[0].token);
            this.authService.setCurrentUser(res.result[0]);
            this.authService.setLoggedIn(true);
            this.router.navigateByUrl('/');
          } else {
            this.errorMsg = res.errorDescription;
            this.getImg();
          }
        });
    }
  }

  public get f(): FormGroup {
    return this.loginForm;
  }

  togglePass() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
