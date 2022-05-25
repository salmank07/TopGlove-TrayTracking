import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder

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
        console.log(data)
      });
    }
}
