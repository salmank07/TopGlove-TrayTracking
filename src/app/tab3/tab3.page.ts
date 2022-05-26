import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/toast.service';
import { UserService } from '../services/user.service';

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
    private fb: FormBuilder
  ) {
    this.userdetails();
    this.generateForm();
  }
  _data: any
  isDeleted: any;
  user: any
  role: any
  spec: any
  view: boolean
  createdBy: any
  userName: any
  updatedata: any
  updateUserForm: any;
  formerType: any

  ngOnInit(): void {
    this.generateForm();
    this.getAllDetails()
  }
  userdetails() {
    this.loadingService.show();
    this.apiService.doLogin({ userName: "geetha", password: "123" }).subscribe(data => {
      this.loadingService.hide();
      this._data = data
      console.log(data)
      console.log(this.isDeleted)
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
    this.contactForm = new FormGroup({
      emailControl: new FormControl('', <any>Validators.required),
      subjectControl: new FormControl('', <any>Validators.required),
      messageControl: new FormControl('', <any>Validators.required)
  });
    this.updateUserForm = this.fb.group({
      createdBy: [''],
      role: [''],
      userName: ['abc'],
      password: [''],
      userId: [''],
      emailId: [''],
      additionalInfo: ['']
    });
   
  }



  getAllDetails() {
    this.apiService.trayDetails().subscribe(data => {
      this.updateUserForm = data
      console.log(data, 'data')
    })
  }


  doChange(event: any) {
   
 
    this.userName = event.target.value;
    console.log(this.userName, 'fjgdoifhgiodh')
    this.updateUserForm = {
      ...this.updateUserForm,
      userName: this.userName
    }
    console.log(this.updateUserForm, 'fjgdoifhgiodh')
  }


  update() {
    // console.log('kjfbgkjfgb')
    // this.apiService.updateUser(this.updateUserForm).subscribe((data: any) => {

    //   this.updateUserForm = data;
    //   console.log(this.updateUserForm, 'fjgdoifhgiodh')


    // })
  }
  updateUser = () => {
    // this.view = true;

    console.log('zfgf')
    this.apiService.updateUser().subscribe(data => {


      this.toast.success('Updated Successfully')
      this.updateUserForm.reset();
    });
  }

  deleteUser(params: any) {
    this.apiService.deleteUser(params).subscribe(data => {
      this.toast.success('Deleted Successfully')
      this.userdetails();
      // window.location.reload();
    })
  }
}

