import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.generateAddUserForm();
   }

  ngOnInit() {}

    addUserForm: FormGroup

    generateAddUserForm = () => {
      this.addUserForm = this.fb.group({
        createdBy: [''],
        role: [''],
        userName: [''],
        password: [''],
        userId: [''],
        emailId: [''],
        additionalInfo: ['']
      });
    }

    uploadUser() {
      this.apiService.addUser(this.addUserForm.value).subscribe(data => {
        this.toast.success('Added Successfully')
        this.addUserForm.reset();
      });

      setInterval(out => {
        this.router.navigate(['/tabs/tab3'])
      }, 800)
      
    }
}
