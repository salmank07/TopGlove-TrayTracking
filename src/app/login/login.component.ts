import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/toast.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private apiservice: ApiService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService,
    private toast: NotificationService,

  ) {

    this.loadLoginForm();
  }

  ngOnInit() { }


  loginForm: FormGroup

  loadLoginForm = () => {
    this.loginForm = this.fb.group({
      userName: [''],
      password: ['']
    });
  }

  login() {
    this.loadingService.show();
    this.apiservice.doLogin(this.loginForm.value).subscribe((res) => {
      this.loadingService.hide();
      if (res) {
        this.userService.User = res.userName;
        this.userService.Role = res.role;
        if (res.role == "operator") {
          this.userService.IsSuperUser = false;
          this.loadingService.hide();
          this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
        }
        else {
          this.userService.IsSuperUser = true;
          this.loadingService.hide();
          this.router.navigate(['/tabs/tab2'], { replaceUrl: true });
        }
      } else {
        this.toast.error('Please enter valid username');
      }
    },
      (error: any) => {
        console.log(error);
        this.loadingService.hide();
        this.toast.error('Unable to validate user. Please try agian after sometime.');
      });

  }
}


