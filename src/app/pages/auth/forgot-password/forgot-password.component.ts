import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, merge, Observable } from 'rxjs';
import { GenericValidator } from '../../shared/custom-validators/generic-validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
  
  forgotForm: FormGroup
  submitted = false;
  user_email: any;
  errorMessage: '';

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string} };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.validationMessages = {
      email: {
        required: "Email is required",
        pattern: "This email is invalid"
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
   }

  ngOnInit(): void {
    this.forgotForm =  this.fb.group({
      email: ['', [Validators.required,
                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') ]]
     });
  }

  public get f() {
    return this.forgotForm.controls;
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form
   // This is required because the valueCahnge does not provide notification on blur
   const controlBlurs: Observable<any>[] = this.formInputElements
   .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

   // Merge the blur event observable with the valueCahnges observable
   // so we only to subscribe once.
   merge(this.forgotForm.valueChanges, ...controlBlurs).pipe(
     debounceTime(800))
     .subscribe(value => {
       this.displayMessage = this.genericValidator.processMessages(this.forgotForm);
     });
  }

  onSubmit() {
    if (this.forgotForm.invalid) {
      this.submitted = true;
      return
    }
    else {
      this.user_email = this.forgotForm.value;
      console.log(this.user_email);
      localStorage.setItem('forgot_email', JSON.stringify(this.user_email));


      Swal.fire(
        'Emai Send lSuccesfully!',
        'Click ok Button for continue Reset Password',
        'success'
      ).then((result) => {
        this.user_email
        if (result.isConfirmed) {

          this.router.navigate(['/reset-password']);
        }
      })

      { { this.user_email } }

    }
  }

}
