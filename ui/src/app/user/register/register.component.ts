import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { USER_URL } from '../../models/url';
import { ApiService } from '../../services/api.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  stockExchange: string[];
  userForm: FormGroup;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;


  ngOnInit() {

    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(null, [Validators.email]),
      userName: new FormControl(),
      password: new FormControl()
    });
    this.stockExchange = ['Nse', 'Bse'];
  }


  constructor(private apiService: ApiService, private snackBar: SnackbarService) { }

  onSubmit() {
    if (this.userForm.valid && !this.userForm.errors) {
      const user: User = new User();
      this.setUser(user);
      this.save(user);
    }
  }

  private save(user: User) {
    this.apiService.postBody(USER_URL, user).subscribe((response) => {
      this.userForm.reset();
      this.formDirective.resetForm();
      this.snackBar.openSnackBar('User registered successfully', 'x');
    });
  }

  private setUser(user: User) {
    const ctrl = this.userForm.controls;
	console.log(ctrl);
    user.firstName = ctrl.firstName.value;
    user.lastName = ctrl.lastName.value;
    user.email = ctrl.email.value;
    user.userName = ctrl.userName.value;
    user.password = ctrl.password.value;
    user.isActive = 1;
  }
}
