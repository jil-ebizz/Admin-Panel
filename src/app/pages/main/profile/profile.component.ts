import { AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from './../../shared/custom-validators/generic-validator';
import { PasswordMatcher } from './../../shared/custom-validators/password-matcher';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  profileForm: FormGroup;
  passwordSetting: FormGroup;
  errorMessage: '';

  submitted = false;
  saved = false;

  imageWidth: number = 60;
  imageMargin: number = 10;
  fileToUpload: any;
  imageUrl: any;
  url ='';

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string} };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) { 

    // Defines all of the validation messages for the form.
   // These could instead be retrieved from a file or database.
   this.validationMessages = {
     file: {
       required: "Profile photo is required"
     },
     first_name: {
       required: "First name is required",
       minLength: "First name must be at least three characters.",
       maxLength: "First name can't exceed 50 characters.",
       pattern: "Only  alphabets allowed"
     },
     last_name: {
       required: "Last name is required",
       minLength: "Last name must be at least three characters.",
       maxLength: "Last name can't exceed 50 characters.",
       pattern: "Only  alphabets allowed"
     },
     email: {
       required: "Email is required",
       pattern: "This email is invalid"
     },
     password: {
      required: "Password is required",
      minLength: "The password length must be greater than or equal to 8"
     },
     confirmPassword: {
      required: "Confirm password is required",
      match: "Password does not match."
     },
     newPassword: {
      required: "New password is required",
      minLength: "The password length must be greater than or equal to 8"
    } 
   };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  
  ngOnInit(): void {
    this.profileForm =  this.fb.group({
      file: ['', [Validators.required]],
      first_name: ['', [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50),
                        Validators.pattern('[a-zA-Z]*$') ]],
      last_name: ['', [Validators.required,
                       Validators.minLength(3),
                       Validators.maxLength(50),
                       Validators.pattern('[a-zA-Z]*$') ]],
      email: ['', [Validators.required,
                   Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') ]],    
    });

    this.passwordSetting = this.fb.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(6)]],
      newPassword: ['', [Validators.required,Validators.minLength(6)]],
    },{  Validators: PasswordMatcher.match
        // validator: PasswordMatcher('new_password', 'confirm_password')
    });
}



//   password: ['', [Validators.required,
//     Validators.minLength(8)]],
// confirmPassword: ['', Validators.required],
// newPassword: ['', [Validators.required, Validators.minLength(8)]],
// },{ Validators: PasswordMatcher.match});
  public get f() { return this.profileForm.controls; }

  public get g() { return this.passwordSetting.controls; }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form
   // This is required because the valueCahnge does not provide notification on blur
   const controlBlurs: Observable<any>[] = this.formInputElements
   .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

   // Merge the blur event observable with the valueCahnges observable
   // so we only to subscribe once.
   merge(this.profileForm.valueChanges, ...controlBlurs).pipe(
     debounceTime(800))
     .subscribe(value => {
       this.displayMessage = this.genericValidator.processMessages(this.profileForm);
     });
  }

  onSubmit() {
    this.submitted = true;
  }

  onSaved() {
    this.saved = true;
  }

  onProfileChange(event)
  {
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);     
      
      reader.onload = (event: any) => {
        console.log(event)
        this.url = event.target.result;    
      }      
     }
   }

 
}
