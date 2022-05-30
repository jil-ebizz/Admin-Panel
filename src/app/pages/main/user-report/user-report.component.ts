import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UserReportService } from './user-report.service';
import { Observable } from 'rxjs';
import { UserReport } from './user-report';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css'],
  providers: [UserReportService, DecimalPipe]
})
export class UserReportComponent implements OnInit {

  reports$ : Observable<UserReport[]>;
  total$ : Observable<number>;

  //Sorting
  order: string = 'info.name';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  
  user_filter: any = { reported: ''};
  sortedCollection: any[];
  page :any = 1 ;
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  

  constructor(public service: UserReportService, private modalService: NgbModal, private orderPipe: OrderPipe) { 
    this.reports$ = service.reports$;
    this.total$ = service.total$;

    this.sortedCollection = orderPipe.transform(this.reports$, 'reported');
    console.log(this.sortedCollection);
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content);
  }
  
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortablee !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
