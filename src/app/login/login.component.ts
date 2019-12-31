import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthLoginInfo} from '../auth/auth-login-info';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
    password: new FormControl('')
  });


  constructor(private authService: AuthService, private token: TokenStorageService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }


  signIn() {
    const {username, password} = this.loginForm.value;

    const authLoginInfo = new AuthLoginInfo(username, password);

    this.authService.attemptAuth(authLoginInfo).subscribe(
      data => {
        this.token.saveToken(data.accessToken);
        this.token.saveUsername(data.username);
        this.token.saveAuthorities(data.roles);
        this.token.saveUserId(data.id);
        this.token.saveName(data.name);
        this.token.saveEmail(data.email);


        console.log(this.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.token.getAuthorities();
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        console.log(error);
        this.isLoginFailed = true;
      }
    );
  }


  reloadPage() {
    window.location.reload();
  }
}
