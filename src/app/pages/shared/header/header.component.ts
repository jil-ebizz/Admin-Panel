import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    // var ses_login = (localStorage.getItem('logindata'));
    // if (ses_login === null) {
    //   this.router.navigate(['']);
    // }
  }

//   logout() {
//     this.authenticationService.logout();
//     this.router.navigate(['/login']);
// }

logout(){
  localStorage.removeItem('userDetails');
  localStorage.clear();
  this.router.navigate(['/login']);
}
}

