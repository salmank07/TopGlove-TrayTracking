import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as moment from 'moment';
import { LoadingService } from '../services/loading.service';
import { NotificationService } from '../services/toast.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService
  ) {
    this.generateTrayDetails();
  }

  _traydetails: any
  _count: number
  _count1: number
  _airDryQuan: number
  _ovenDryQuan: number

  _payload: any
  user: string = null
  process: string = null
  from: string = moment().format();
  to: string = moment().format();
  dateValue1: any = moment(this.from).format("MMM Do YY")

  generateTrayDetails() {
    delete this._count;
    delete this._count1;
    delete this._airDryQuan;
    delete this._ovenDryQuan

    let payload = {
      'fromDate': new Date(this.from),
      'toDate': new Date(this.to),
      'user': this.user,
      'process': this.process
    }
    this.loadingService.show();
    this.apiService.filterItem(payload).subscribe(data => {
      
      this._traydetails = data

      let airTrolleycount: number = 0;
      let OvenTrolleycount: number = 0;
      let quantity: number = 0;
      let test: number = 0;
      let quantity1: number = 0;
      let test1: number = 0;

      for (let i = 0; i < this._traydetails.length; i++) {
        if (this._traydetails[i].process == "Air Dry") {
          airTrolleycount = airTrolleycount + 1;
          quantity = this._traydetails[i].noOfFormer
          test = test + +quantity
          this._airDryQuan = test
          this._count = airTrolleycount;
        }
        else if (this._traydetails[i].process == "Oven Dry") {
          OvenTrolleycount = OvenTrolleycount + 1;
          quantity1 = this._traydetails[i].noOfFormer
          test1 = test1 + +quantity1
          this._ovenDryQuan = test1
          this._count1 = OvenTrolleycount;
        }
      }
      this.loadingService.hide();

      
    })
  }

  // trolleyCount() {
  //   this.apiService.filterItem(payload).subscribe(data => {
  //     console.log(data)
  //   }
  // }


}




