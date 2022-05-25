import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private apiService: ApiService
  ) {
    this.generateTrayDetails();

  }

  _traydetails: any
  _count:number
  _airDryQuan:number
  generateTrayDetails() {
    this.apiService.trayDetails().subscribe(data => {
      this._traydetails = data
      let count: number = 0;
      let quantity: number = 0;
      let test: number = 0;
      
      for (let i = 0; i < this._traydetails.length; i++) {
        if (this._traydetails[i].process == "Air Dry") {
          count = count + 1;
        }
        quantity = this._traydetails[i].noOfFormer
        test = test + +quantity
        this._airDryQuan = test
      }
      this._count = count;
    })
  }

  trolleyCount() {

  }


}




