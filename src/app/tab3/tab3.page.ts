import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private loadingService: LoadingService,
    private toast: NotificationService,
    private fb: FormBuilder,
    private modalController: ModalController
  ) {
    this.userdetails();
    this.generateForm();
  }
  _data: any
  isDeleted: any;
  user: any
  role: any
  spec: any
  view: boolean = false;
  updateUserForm: FormGroup
  

  ngOnInit(): void {
  }

  userdetails() {
    this.loadingService.show();
    this.apiService.doLogin({ userName: "geetha", password: "123" }).subscribe(data => {
      this.loadingService.hide();
      this._data = data
    });
  }
  onLoad() {
    this.user = localStorage.getItem('userName')
    this.spec = localStorage.getItem('Role')
    this.role = localStorage.getItem('isSuperUser')

    if (this.role == 'true') {
      return true;
    }
    return false;

  }

  logout = () => {
    this.apiService.logout();
    this.router.navigate(['./login']);
  }

  generateForm() {
    this.updateUserForm = this.fb.group({
      createdBy: ['this.userTest'],
      role: [''],
      userName: [''],
      password: [''],
      userId: [''],
      emailId: [''],
      additionalInfo: ['']
    });
  }
  
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  updateUser = () => {
    this.apiService.updateUser(this.updateUserForm.value).subscribe(data => {
      this.toast.success('Updated Successfully')
      this.updateUserForm.reset();
      this.dismiss();
    });
    this.userdetails();
  }

  deleteUser(params: any) {
    this.apiService.deleteUser(params).subscribe(data => {
      this.toast.success('Deleted Successfully')
      this.userdetails();
      window.location.reload();
    })
  }
}

