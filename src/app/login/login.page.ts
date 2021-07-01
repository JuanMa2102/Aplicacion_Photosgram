import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('ryan84@example.net', [Validators.required]),
    password: new FormControl('password', [Validators.required])
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {


  }

  onSubmit() {
    console.log('OnSubmit');
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(_ => {
        console.log('navigate: /tabs/tab1');
        this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
      });

  }

}
