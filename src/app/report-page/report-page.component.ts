import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as moment from 'moment';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/toast.service';
import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
})
export class ReportPageComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private modalController: ModalController
  ) {
    this.loadReport();
    this.counter();
    this.generateInputForm();

  }

  ngOnInit() { }

  _trayDetails: any
  _count: string[] = [];
  _test: any
  _a: any
  statusAir: any
  statusOven: any
  user: string = null
  process: string = null
  from: string = moment().format();
  to: string = moment().format();

  loadReport() {

    let payload = {
      'fromDate': new Date(this.from),
      'toDate': new Date(this.to),
      'user': this.user,
      'process': this.process
    }
    let testtime = moment(this.from).second()
    console.log(testtime, "time")
    this.loadingService.show();
    this.apiService.filterItem(payload).subscribe(data => {
      this.loadingService.hide();
      this._trayDetails = data
      console.log(typeof (this._trayDetails.dateTime), "hello")

      for (let i = 0; i < this._trayDetails.length; i++) {
        this._test = this._trayDetails[i].dateTime;
        if (this._trayDetails[i].process == 'Air Dry') {

          this._a = moment(this._test).add(1, 'days').format('MMMM Do YY, h:mm:ss a');
          if (this._test == this._a) {
            this.statusAir = "completed";
            console.log(this.statusAir, "air")
          }
          else {
            this.statusAir = "In Process";
          }
          this._count.push(this._a)
        }
        else if (this._trayDetails[i].process == 'Oven Dry') {
          this._a = moment(this._test).add(2, 'days').format('MMMM Do YYYY, h:mm:ss a');
          if (this._a == this._a) {
            this.statusOven = "completed";
          }
          else {
            this.statusOven = "In Process";
          }
          this._count.push(this._a)
        }
      }
    })
  }

  generateExcel() {
    let payload = {
      'fromDate': new Date(this.from),
      'toDate': new Date(this.to),
      'user': this.user,
      'process': this.process
    }

    this.apiService.getExcelReport(payload).subscribe(response => {
      const file = new Blob([response.body], { type: 'application/xlsx' });
      const fileName = `${moment().format('YYYY-MM-DDTHH:mm')}_TopGlove_Tracker.xlsx`;
      this.loadingService.hide();
      saveAs(file, fileName);
    }, (error) => {
      this.toast.error("Please try again later.");
      this.loadingService.hide();
    });
  }

  _hour: any
  _minutes: any
  _sec: any

  counter() {
    let eventTime: any = this._test;
    console.log(eventTime, "eventtime")
    let currentTime: any = 55686533;
    let diffTime: any = eventTime - currentTime;
    let duration: any = moment.duration(diffTime * 1000, 'milliseconds');
    let interval = 1000;

    let final = setInterval(async () => {
      let result = moment.duration(duration - interval, 'milliseconds');
      this._hour = result.hours();
      this._minutes = result.minutes();
      this._sec = result.seconds();
    }, interval);

  }

  // for edit pop modal

  dateValue1: any;
  dateValue2: any;
  dateformate: string;
  isReOven:any;

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
      userId: [''],
      additionalInfo: ['']
    });
  }

  uploadEntity() {
    this.apiService.updateEntity(this.inputForm.value).subscribe(data => {
      this.toast.success('Submitted Successfully');
      this.inputForm.reset();
      this.modalController.dismiss();
      window.location.reload();
    });

    // edit pop modal ends
    
  }


}
