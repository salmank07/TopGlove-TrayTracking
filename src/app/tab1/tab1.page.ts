import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import * as moment from 'moment';
import { ApiService } from '../services/api.service';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  dateValue1: any;
  dateValue2: any;
  dateformate: string;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.generateInputForm();
  }

  inputForm: FormGroup;

  formatDate(params: any) {
    return params
  }

  clear() {
    this.inputForm.reset()
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
      console.log(data, "hell")
    });
    this.inputForm.reset();
  }


}
