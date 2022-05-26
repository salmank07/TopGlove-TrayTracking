import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/toast.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  dateValue1: any;
  dateValue2: any;
  dateformate: string;
  isReOven:any;
  ngOnInit(): void {
    
  }
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toast: NotificationService,
    private loadingService: LoadingService
  ) {
    this.generateInputForm();
  }

  inputForm: FormGroup;

  isSuperUser:any
  view:boolean

  formatDate(params: any) {
    return params
  }

  generateInputForm = () => {

     this.isSuperUser = localStorage.getItem('isSuperUser')
     

    this.inputForm = this.fb.group({
      formerType: [''],
      noOfFormer: [''],
      batchNo: [''],
      process: [''],
      dateTime: [''],
      status: [''],
      user: [''],
      additionalInfo: [''],
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

  uploadEntity() {
    this.apiService.insertEntity(this.inputForm.value).subscribe(data => {
      this.toast.success('Submitted Successfully');
      this.inputForm.reset();
    });
    
  }
}
