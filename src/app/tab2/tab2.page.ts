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
    this.userList();
  }

  _traydetails: any
  _count: number
  _count1: number
  _airDryQuan: number
  _ovenDryQuan: number
  _releasedQuan: number = 0;
  _releasedCount: number = 0;
  _releasedQuan1: number = 0;
  _releasedCount1: number = 0;
  _releasedQuan2: number = 0;
  _releasedCount2: number = 0;
  _reOvenQuan: number
  _reOvenCount: number
  totalCount: number = 0;
  totalQuantity: number = 0;

  _userList: string[] = [];

  _payload: any
  user: string = null
  process: string = null
  from: string = moment().format();
  to: string = moment().format();
  dateValue1: any = moment(this.from).format("MMM Do YY")

  currentUser: string = localStorage.getItem('userName')
  superUser: string = localStorage.getItem('isSuperUser')
  role: string = localStorage.getItem('Role')

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
      console.log(this._traydetails)
      let airTrolleycount: number = 0;
      let OvenTrolleycount: number = 0;

      let releasedTrolleycount: number = 0;
      let reOvenTrolleycount: number = 0;
      let releasedTrolleycount1: number = 0;
      let releasedTrolleycount2: number = 0;
      

      let quantity: number = 0;
      let test: number = 0;
      let quantity1: number = 0;
      let test1: number = 0;

      let test2: number = 0;
      let quantity2: number = 0;

      let test21: number = 0;
      let quantity21: number = 0;

      let test22: number = 0;
      let quantity22: number = 0;

      let test3: number = 0;
      let quantity3: number = 0;




      for (let i = 0; i < this._traydetails.length; i++) {
        if (this._traydetails[i].process == "Air Dry") {
          if (this._traydetails[i].status == "Completed") {
            releasedTrolleycount += 1;
            quantity2 = this._traydetails[i].noOfFormer
            test2 = test2 + +quantity2
            this._releasedQuan = test2
            this._releasedCount = releasedTrolleycount;
          } else {
            airTrolleycount = airTrolleycount + 1;
            quantity = this._traydetails[i].noOfFormer
            test = test + +quantity
            this._airDryQuan = test
            this._count = airTrolleycount;
          }
        }
        else if (this._traydetails[i].process == "Oven Dry") {
          if (this._traydetails[i].status == "Completed") {
            releasedTrolleycount1 += 1;
            quantity21 = this._traydetails[i].noOfFormer
            test21 = test21 + +quantity21
            this._releasedQuan1 = test21
            this._releasedCount1 = releasedTrolleycount1;
          } else {
            OvenTrolleycount = OvenTrolleycount + 1;
            quantity1 = this._traydetails[i].noOfFormer
            test1 = test1 + +quantity1
            this._ovenDryQuan = test1
            this._count1 = OvenTrolleycount;
          }
        }
        // else if (this._traydetails[i].status == "Completed") {
        //   releasedTrolleycount += 1;
        //   quantity2 = this._traydetails[i].noOfFormer
        //   test2 = test2 + +quantity2
        //   this._releasedQuan = test2
        //   this._releasedCount = releasedTrolleycount;
        // }
        else if (this._traydetails[i].process == "ReOven") {
          if (this._traydetails[i].status == "Completed") {
            releasedTrolleycount2 += 1;
            quantity22 = this._traydetails[i].noOfFormer
            test22 = test22 + +quantity22
            this._releasedQuan2 = test22
            this._releasedCount2 = releasedTrolleycount2;
          } else {
            reOvenTrolleycount += 1;
            quantity3 = this._traydetails[i].noOfFormer
            test3 = test3 + +quantity3
            this._reOvenQuan = test3
            this._reOvenCount = reOvenTrolleycount;
          }
        }
      }
      this.totalQuantity = this._releasedQuan + this._releasedQuan1 + this._releasedQuan2;
      this.totalCount = this._releasedCount + this._releasedCount1 + this._releasedCount2;

      this.loadingService.hide();


    })

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

}




