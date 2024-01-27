import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { AppServiceService } from 'src/app/services/app-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';

  constructor(private formBuilder: FormBuilder,
    private authService: AppServiceService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formGroup = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(emailregex)],
        this.checkInUseEmail,
      ],
      password: [null, [Validators.required, this.checkPassword]],
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  checkInUseEmail(control) {
    let db = ['yatheesh@gmail.com'];
    return new Observable((observer) => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required')
      ? 'email id is required'
      : this.formGroup.get('email').hasError('pattern')
        ? 'Not a valid email address'
        : this.formGroup.get('email').hasError('alreadyInUse')
          ? 'This emailaddress is already in use'
          : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required')
      ? 'Field is required (at least eight characters,one specail charecter, one uppercase letter and one number)'
      : this.formGroup.get('password').hasError('requirements')
        ? 'Password needs to be at least eight characters,one specail charecter, one uppercase letter and one number'
        : '';
  }

  onSubmit(formVal) {
    console.log('ppp', formVal);
    const hashedPassword = CryptoJS.SHA256(formVal.password).toString(CryptoJS.enc.Hex);
    console.log("hashedPassword", hashedPassword)
    if (formVal.email === 'test45@yopmail.com' && formVal.password === 'Test@123') {
      const credentials = {
        username: 'test45@yopmail.com',
        password: hashedPassword,
      };

      this.authService.login(credentials).subscribe(
        (response) => {
          console.log('Login successful:', response);
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
      this.router.navigate(['eshop/dashboard'])
      this.toastr.success('Login successfully');
    } else {
      this.toastr.error("Invalid credentials!")
    }
  }
}
