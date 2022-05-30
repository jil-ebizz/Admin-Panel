import { DecimalPipe } from "@angular/common";
import { Injectable, PipeTransform } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { REPORT } from "./report-data";
import { SortColumn, SortDirection } from "./sortable.directive";
import { UserReport } from "./user-report";


interface SearchResult{
    reportss: UserReport[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(reportss: UserReport[], column: SortColumn, direction: string): UserReport[] {
    if (direction === '' || column === '') {
      return reportss;
    } else {
      return [...reportss].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  
  function matches(reports: UserReport, term: string, pipe: PipeTransform) {
    return reports.reported.toLowerCase().includes(term.toLowerCase())
      || pipe.transform(reports.rtime).includes(term)
      || pipe.transform(reports.date).includes(term);
  }

@Injectable({providedIn: 'root'})
export class UserReportService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _reports$ = new BehaviorSubject<UserReport[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._reports$.next(result.reportss);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get reports$() { return this._reports$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let reportss = sort(REPORT, sortColumn, sortDirection);

    // 2. filter
    reportss = reportss.filter(reports => matches(reports, searchTerm, this.pipe));
    const total = reportss.length;

    // 3. paginate
    reportss = reportss.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({reportss, total});
  }
}