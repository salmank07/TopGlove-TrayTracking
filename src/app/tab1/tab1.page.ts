import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import * as moment from 'moment';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/toast.service';





@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  dateValue1: any;
  dateValue2: any;
  dateformate: string;
  isReOven: any;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toast: NotificationService,
    private loadingService: LoadingService
  ) {
    // this.isSuperUser = null;
    this.generateInputForm()

  }
  ngOnInit(): void {

  }

  inputForm: FormGroup;
  view: boolean = false;
  isSuperUser: any = localStorage.getItem('isSuperUser');


  formatDate(params: any) {
    return params
  }

  generateInputForm = () => {
    this.inputForm = this.fb.group({
      formerType: [''],
      noOfFormer: [''],
      batchNo: [''],
      process: [''],
      dateTime: [''],
      status: [''],
      user: [''],
      additionalInfo: ['']
    })


    // date: String = this.inputForm.value.datTime.toUTCString();

    // "formerType": "string",
    // "noOfFormer": "string",
    // "batchNo": "string",
    // "dataTime": "2022-05-23T06:21:24.631Z",
    // "user": "string",
    // "proces": "string",
    // "status": "string",
    // "additionalInfo": "string"


  }
  // reloadThis() {
  //   window.location.reload();
  // }

  uploadEntity() {
    this.apiService.insertEntity(this.inputForm.value).subscribe(data => {
      this.toast.success('Submitted Successfully');
      this.inputForm.reset();
    });

  }

}
