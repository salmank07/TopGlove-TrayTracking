import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as FileSaver from 'file-saver';
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

  date: any;
  constructor(
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private modalController: ModalController
  ) {

    this.loadReport();
    this.generateInputForm();
  }

  ngOnInit() { }

  _trayDetails: any
  _count: string[] = [];

  pView: any[] = [];

  _userList: Array<string>[] = [];

  _hour: any[] = [];
  _minutes: any[] = [];
  _sec: any[] = [];

  _userList1: any[] = [];

  _test: any
  _a: any
  statusAir: any
  statusOven: any
  user: string = null
  process: string = null
  from: string = moment().format();
  to: string = moment().format();
  convertedFrom:any
  convertedTo:any
  
  currentdateFrom = moment().format('MMMM Do YYYY');
  currentdateTo = moment().format('MMMM Do YYYY');

  convert(params: any): string {
   return   moment(params).format('MMMM Do YYYY, h:mm:ss');
  }

  filterConvert(params: any): string {
    return   moment(params).format('MMMM Do YYYY, h:mm:ss');
   }

  currentUser: string = localStorage.getItem('userName')
  superUser: string = localStorage.getItem('isSuperUser')
  role: string = localStorage.getItem('Role')
  
  loadReport() {

    

    let payload = {
      'fromDate': new Date(this.from),
      'toDate': new Date(this.to),
      'user': this.user,
      'customer': this.process
    }

    this.loadingService.show();
    this.apiService.filterItem(payload).subscribe(data => {       //***api call***

      this.loadingService.hide();

      this._trayDetails = data
      this.pView = [];

      for (let i = 0; i < this._trayDetails.length; i++) {
        this._test = this._trayDetails[i].dateTime;
        // timer function
        let convr = moment(this._test).valueOf()
        if (this._trayDetails[i].process == 'Air Dry' && this.superUser == 'true') {
          this._a = moment(this._test).add(1, 'days').format('');

          {
            // let conver = moment(this._a).valueOf();
            // let eventTime: any = conver;
            // let currentTime: any = convr;
            // let diffTime: any = eventTime - currentTime;
            // let duration: any = moment.duration(diffTime * 1000, 'milliseconds');
            // let interval = 1000;

            // setInterval(() => {
            //   let result = moment.duration(duration - interval, 'milliseconds');
            //   this._hour.push(result.hours());
            //   this._minutes.push(result.minutes());
            //   this._sec.push(result.seconds());
            // }, interval);
          }

          //   {
          //   if (this._test == this._a) {
          //     this.statusAir = "completed";
          //     console.log(this.statusAir, "air")
          //   }
          //   else {
          //     this.statusAir = "In Process";
          //   }
          // }
          this.pView.push(this._trayDetails[i])
          this._count.push(this._a)
        }
        else if (this._trayDetails[i].process == 'Air Dry' && this.superUser == 'false') {
          if (this._trayDetails[i].user == this.currentUser) {
            this._a = moment(this._test).add(1, 'days').format('');
            this.pView.push(this._trayDetails[i])
            this._count.push(this._a)
          }
        }
        else if (this._trayDetails[i].process == 'Oven Dry' && this.superUser == 'true') {
          this._a = moment(this._test).add(2, 'days').format('');


          {

            //   let conver = moment(this._a).valueOf();
            //   let eventTime: any = conver;
            //   let currentTime: any = convr;
            //   let diffTime: any = eventTime - currentTime;
            //   let duration: any = moment.duration(diffTime * 1000, 'milliseconds');
            //   let interval = 1000;
            //   setInterval(() => {
            //     let result = moment.duration(duration - interval, 'milliseconds');
            //     this._hour.push(result.hours());
            //     this._minutes.push(result.minutes());
            //     this._sec.push(result.seconds());
            //   });
          }

          {
            // if (this._a == this._a) {
            //   this.statusOven = "completed";
            // }
            // else {
            //   this.statusOven = "In Process";
            // }
          }

          this.pView.push(this._trayDetails[i])
          this._count.push(this._a)
          console.log(this._hour, "hour")
        }
        else if (this._trayDetails[i].process == 'Oven Dry' && this.superUser == 'false') {
          if (this._trayDetails[i].user == this.currentUser) {
            this._a = moment(this._test).add(2, 'days').format('');
            this._count.push(this._a)
            this.pView.push(this._trayDetails[i])
          }
        }
        else if (this._trayDetails[i].process == 'ReOven' && this.superUser == 'true') {
          this._a = moment(this._test).add(this._test, 'days').format('');
          this.pView.push(this._trayDetails[i])
          this._count.push(this._a)
        }
        else if (this._trayDetails[i].process == 'ReOven' && this.superUser == 'false') {
          if (this._trayDetails[i].user == this.currentUser) {
            this._a = moment(this._test).add(this._test, 'days').format('');
            this.pView.push(this._trayDetails[i])
            this._count.push(this._a)
          }
        }
      }
    });
    console.log(this.pView, "sepaarate");
    console.log(this._count, "sepaarate");
    this.userList();
  }

  userList() {
    let payload = {
      'fromDate': new Date(this.from),
      'toDate': new Date(this.to),
      'user': this.user,
      'process': this.process
    }

    this.apiService.filterItem(payload).subscribe(data => {
      let count: any[] = []
      for (let i = 0; i < data.length; i++) {
        count.push(data[i].user)
      }
      let removed = [...new Set(count)];
      this._userList = removed;
    });
  }

  generateExcel() {
    let payload = {
      'fromDate': new Date(this.from),
      'toDate': new Date(this.to),
      'user': this.user,
      'process': this.process
    }
    this.apiService.getExcelReport(payload).subscribe(response => {
      // FileSaver.saveAs(response);
      const file = new Blob([response.body], { type: 'application/xlsx' });
      const fileName = `${moment().format('YYYY-MM-DD')}.xlsx`;
      // this.date = new Date();
      // const latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd.xlsx');
      this.loadingService.hide();
      // saveAs(file, fileName);
      // const fileName = `${moment().format('YYYY-MM-DD')}TopGlove.xlsx`;
      FileSaver.saveAs(file, fileName);
      // const fileName = `topglove.xlsx`;
      // this.loadingService.hide();
      // saveAs();
      // FileSaver.saveAs(file, fileName);
    }, (error) => {
      this.toast.error("Please try again later.");
      this.loadingService.hide();
    });
  }

  // for edit pop modal

  dateValue1: any;
  dateValue2: any;
  dateformate: string;
  isReOven: any;
  inputForm: FormGroup;
  view: boolean

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
      userId: [''],
      additionalInfo: ['']
    });
  }

  uploadEntity() {
    this.apiService.updateEntity(this.inputForm.value).subscribe(data => {
      this.toast.success('Submitted Successfully');
      this.inputForm.reset();
      this.modalController.dismiss();
      this.loadReport();
    });
  }
  // edit pop modal ends

}
