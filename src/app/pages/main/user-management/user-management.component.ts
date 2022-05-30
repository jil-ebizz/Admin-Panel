import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import {SortableDirective, SortEvent} from './sortable.directive';
import { IUser } from './user';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { OrderPipe } from 'ngx-order-pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [UserService, DecimalPipe]
})
export class UserManagementComponent implements OnInit {

  // page: number = 1;
  pageSize: any;
  page :any = 1 ;
  pageSizee: any;
  totalData : any = 0;
  public p: number; 
  public userdata:any[];
  public userUpdateForm!: FormGroup;
  private sub!: Subscription;
  public id = this.route.snapshot.params['id'];

  imageWidth: number = 60;
  imageMargin: number = 10;

  userFilter: any = { first_name: '', last_name: '', email: ''};
  
  order: string = 'first_name';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  fileToUpload: any;
  imageUrl: any;
  url ='';
  sortedCollection: any[];

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(private fb: FormBuilder,
             public service: UserService, 
             config: NgbModalConfig,
             private modalService: NgbModal, 
             private orderPipe: OrderPipe,
             private route: ActivatedRoute,
             private router: Router,
             ) { 

    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

    this.sortedCollection = orderPipe.transform(this.userdata, 'first_name');
  }

  ngOnInit(): void {
    this.Userlist();
    this.p = 1;
   
   this.userUpdateForm = this.fb.group({
     avatar : [''],
     firstName :[''],
     lastName : [''],
     email :['']
   });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
  
  open(content:any,id:any)
  {
   this.modalService.open(content);
    this.service.getdata(id).subscribe((res:any)=>{
      this.userUpdateForm.patchValue({
        avatar : res.data.avatar,
        firstName : res.data.first_name,
        lastName : res.data.last_name,
        email : res.data.email,        
        })
    })
  }

  viewDetails(content: any, id: any) {
    this.modalService.open(content, { size: 'xl' });
    this.service.getdata(id).subscribe((data) => {
      
    })
  }
  updateUser() {
    // alert()
      this.service.updateUser(this.id, this.userUpdateForm.value)
      .subscribe((data:any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your recode has been saved',
          showConfirmButton: false,
          timer: 1500
        })
          console.log(data)
          // this.ngZone.run(() => this.router.navigateByUrl('/user-management'))
          this.router.navigate(['/user-management']);
        }, (err) => {
          console.log(err);
      });
  }


  delete(id:any)
  {
    debugger
    this.service.deleteUser(id).subscribe((data)=>{
    //sweetalert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    })
  }

  
  changePageSize() {
    this.page = 1;
    let per_page = '';
    if(this.pageSize > 0){
      per_page = '&per_page='+this.pageSize
    }
    
    this.service.getUserlist('?page=1'+per_page).subscribe((data:any)=>{
      this.userdata=data.data;
      this.totalData = data.total
      this.pageSize = data.per_page;
    })
    

    // this.userdata
    //   .map((country, i) => ({id: i + 1, ...country}))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  handlePage(event){
    let per_page;
    if(this.pageSize > 0){
      per_page = '&per_page='+this.pageSize
    }else{
      per_page = '';
    }

    this.service.getUserlist('?page='+event+per_page).subscribe((data:any)=>{
      this.userdata=data.data;
      this.totalData = data.total;
      this.pageSize = data.per_page
    })
    
  }


  public Userlist() {
   this.service.getUserlist().subscribe((data:any)=>{
     this.userdata=data.data;
     this.totalData = data.total
     this.pageSize = data.per_page
     console.log(this.userdata);
   })
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


