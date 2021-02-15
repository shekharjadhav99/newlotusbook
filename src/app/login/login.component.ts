import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ICaptchaData } from './types/captcha-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required],
      log: ['', Validators.required],
    })

    this.loginService.getCaptcha()
      .subscribe((response: ICaptchaData) => {
        console.log(response);
        this.loginForm.get('log').setValue(response.log);
        (<HTMLImageElement>document.getElementById('captchaImg')).src = "data:image/png;base64, " + response.img;
      })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value)
    .subscribe((response: ICaptchaData) => {
      console.log(response);
      this.router.navigate(['/'])
     
    })
   

  }
  
  }

