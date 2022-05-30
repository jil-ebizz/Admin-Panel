import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormControlName,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { GenericValidator } from '../../shared/custom-validators/generic-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  loginForm: FormGroup;
  user: any = {};
  submitted = false;
  errorMessage: '';
  // Password:boolean = true;
  hide = true;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alert: AlertService,
    private toast: NgToastService
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      email: {
        required: 'Email is required',
        pattern: 'This email is invalid',
      },
      password: {
        required: 'Password is required',
        minLength: 'The password length must be greater than or equal to 6',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.sessionlogin();
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form
    // This is required because the valueCahnge does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueCahnges observable
    // so we only to subscribe once.
    merge(this.loginForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe((_value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.loginForm
        );
      });
  }

  onSubmit() {
    // alert();
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService
      .login(this.loginForm.value)
      .subscribe((_data) => {
        //sweetalert2
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: 'You are successfully logged in',
        //   showConfirmButton: false,
        //   timer: 3000
        // })
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Logged in successfully',
        });
        this.router.navigate(['/main/dashboard']);
      });
    console.log(this.loginForm.value);
  }

  sessionlogin(){
    var ses_login = localStorage.getItem('userDetails'); 
    if (ses_login != null) {
      window.location.href = 'dashboard';
    }
  }

}
