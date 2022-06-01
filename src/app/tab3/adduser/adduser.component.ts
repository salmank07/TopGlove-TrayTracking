import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private toast: NotificationService,
    private router: Router

  ) {
    
   }

  ngOnInit() {}

  ischeckUser: boolean = true;
  isShowError: boolean = false;

  addUserForm: FormGroup = this.fb.group({
    userName: new FormControl('' , Validators.required),
    createdBy: new FormControl('', Validators.required),
    role: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
    additionalInfo: new FormControl('', Validators.required),
  })

    
    thisFormValid() {
      if (this.addUserForm.invalid || this.ischeckUser) {
        return true;
      }
      return false;
    }
  
    UserValid() {
      this.isShowError = false
      this.ischeckUser = true;
      if (this.f.userName.invalid) {
        return
      }
      this.apiService.checkUser(this.f.userName.value).subscribe(data => {
        console.log(data, 'User')
        if (data['message'] == 'You Can Enter') {
          this.ischeckUser = false
        } else {
          this.ischeckUser = true;
          this.isShowError = true
  
        }
        console.log(data, 'Email')
  
      });
  
    }
    get f() { return this.addUserForm.controls; }

    uploadUser() {
      this.apiService.addUser(this.addUserForm.value).subscribe(data => {
        this.toast.success('Added Successfully')
        this.addUserForm.reset();
      });
        this.router.navigate(['/tabs/tab3'])
    }
}
