import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../../shared/custom-validators/generic-validator';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
   form: FormGroup;
   noticationform: FormGroup;
   submitted = false;
   errorMessage: '';

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string} };
  private genericValidator: GenericValidator;
  
  // selectedColumnModel  = ['John Nixon','Tiger Nixon','Musta Aga', 'Sarla Aga' ];
  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
   // These could instead be retrieved from a file or database.
   this.validationMessages = {
    user: {
      required: "This field is required",
    },
    title: {
      required: "Title is required",
    },
    description : {
      required: "Description is required",
    }
  };

   // Define an instance of the validator for use with this form,
   // passing in this form's set of validation messages.
   this.genericValidator = new GenericValidator(this.validationMessages);
   }

  listOfItems = [
    { id: 1, name: 'John Nixon'},
    { id: 2, name: 'Tiger Nixon'},
    { id: 3, name: 'Musta Aga'},
    { id: 4, name: 'Sarla Aga'}
  ];

  public onSelectAll() {
    const selected = this.listOfItems.map(item => item.id);
    this.form.get('example').patchValue(selected);
  }

  public onClearAll() {
    this.form.get('example').patchValue([]);
  }
  ngOnInit(): void {
    this.noticationform =  this.fb.group({
      user: ['', [Validators.required ]],
      title: ['', [Validators.required  ]],
      description: ['', [Validators.required ]]
      
     });
  }
  public get f() { return this.noticationform.controls; }
  
  ngAfterViewInit(): void {
   
   const controlBlurs: Observable<any>[] = this.formInputElements
   .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

   merge(this.noticationform.valueChanges, ...controlBlurs).pipe(
     debounceTime(800))
     .subscribe(value => {
       this.displayMessage = this.genericValidator.processMessages(this.noticationform);
     });
  }

  onSubmit() {
    // if (this.noticationform.invalid) {
    //   this.submitted = true;
    //   return;
    // }
    this.submitted=true;
  }

}

