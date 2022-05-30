import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { UserReport } from './user-report';

export type SortColumn = keyof UserReport | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[ key: string]: SortDirection}= {'asc': 'desc', 'desc': '', '': 'asc'};

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[appSortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortablee: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction =  rotate[this.direction];
    this.sort.emit({column: this.sortablee, direction: this.direction});
  }

  // constructor() { }

}

