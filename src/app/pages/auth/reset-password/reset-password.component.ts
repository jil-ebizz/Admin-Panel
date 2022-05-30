import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../../shared/custom-validators/generic-validator';
import { PasswordMatcher } from '../../shared/custom-validators/password-matcher';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  // Access every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  resetPwdForm: FormGroup;
  submitted = false;
  errorMessage: '';

  hide = true;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      password: {
        required: 'Password is required',
        minlength: 'The password length must be greater than or equal to 8',
      },
      confirmPassword: {
        required: 'Confirm password is required',
        match: 'Password does not match',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.resetPwdForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: PasswordMatcher.match }
    );
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form
    // This is required because the valueCahnge does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueCahnges observable
    // so we only to subscribe once.
    merge(this.resetPwdForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.resetPwdForm
        );
      });
  }

  onSubmit() {
    console.log('---form', this.resetPwdForm.value);
  }
}
