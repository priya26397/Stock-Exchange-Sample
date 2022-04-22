import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { NAVIGATE_SUMMARY } from '../../models/url';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterService } from '../../services/router.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitMessage: string;
  loginForm: FormGroup;
  @ViewChild(FormGroupDirective, { static: true })
  formGroupDirective: FormGroupDirective;

  constructor(private authService: AuthenticationService,
    private routerService: RouterService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }


  loginSubmit() {

    if (this.loginForm.valid) {
      const ctrl = this.loginForm.controls;
      this.authService.authenticateUser(ctrl.username.value, ctrl.password.value).subscribe(token => {
        if (token) {
          this.setToken(ctrl, token);
        }else{
          this.submitMessage = "Invalid crdentials";
        }

      },
        error => {
          this.submitMessage = error.message || error.error.message;
        });
    }
  }

  private setToken(ctrl: any, token: string) {
    this.authService.setBearerToken(token);
    this.authService.setUserName(ctrl.username.value);
    this.authService.isAuthenticated$.next(true);
    this.routerService.routeTo(NAVIGATE_SUMMARY);
    this.loginForm.reset();
    this.formGroupDirective.resetForm();
  }

}
