import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { catchError } from 'rxjs';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { debounceTime, delay, retry, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';
import { IUser} from './user';
import { USER} from './user-data';



interface SearchResult {
  countries: IUser[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

// function compare(v1, v2) {
//   return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
// }

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: IUser[], column: SortColumn, direction: string): IUser[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: IUser, term: string, pipe: PipeTransform) {
  return country.name.toLowerCase().includes(term)
    || pipe.transform(country.age).includes(term)
    || pipe.transform(country.birthdate).includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  //JSON 
  apiUrl: string = "http://localhost:3000/users"; 

  public listApi = 'https://reqres.in/api/users';
  // public loginApi = 'https://reqres.in/api/login';
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })
  }
  // headers = new HttpHeaders().set('Content-Type', 'application/json');

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<IUser[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });

    this._search$.next();
  }
//   getProduct(id: number): Observable<userdata> {
//     if  (id === 0) {
//         return of(this.initializeIProduct());
//     }
//     const url = `${this.listApi}/${id}`;
//     return this.http.get<userdata>(url).pipe (
//         tap(data => console.log('getProduct: ' + JSON.stringify(data))),
//         catchError(this.handleError)
//     );
// }



  //Delete data
  public deleteUser(id:any)
  {
    debugger
    return this.http.delete( this.listApi + '/'+ id , this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    )
    
  }

  // Get Post by ID
  public getdata(id:any)
  {
    return this.http.get( this.listApi + '/'+ id , this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    )  
  }
 
  //Update Data
  public updateUser(id:any, data:any)
  {
    debugger
   
    return this.http.put(this.listApi + '/'+ id, data, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }



//Delete
// delete(id: any): Observable<any> {
//   var API_URL =`${this.listApi}/${id}`;
//   return this.http.delete(API_URL).pipe(
//     catchError(this.handleError)
//   )
// }
 
private handleError(err: HttpErrorResponse) {

  let errorMessage = '';
  if(err.error instanceof ErrorEvent) {
      
      errorMessage = `An Error Ocuured: ${err.error.message}`;
  } else {
      errorMessage = `Server returned code: ${err.status}, error mesagge is: ${err.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}

  get countries$() { return this._countries$.asObservable(); }
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
    let countries = sort(USER, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries, total});
  }
  getUserlist(filter : any = '') {
    return this.http.get(this.listApi+filter)
  }

//   private initializeIProduct(): userdata {

//     // Return an initialized object
//     return {
//         id: 0,
//         first_name: null,
//         last_name: null,
//         email: null,
//         avatar: null,
//     };

// }
}
