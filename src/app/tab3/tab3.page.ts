import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) {
    
  }

  onLoad() {
    const user = localStorage.getItem('userName')
    const role = localStorage.getItem('isSuperUser')

    if (role == 'true') {
      return true;
    }
    return false;
    
  }
  logout = () => {
    this.apiService.logout();
    this.router.navigate(['./login']);
  }
}

