import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as moment from 'moment';



@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
})
export class ReportPageComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) {
    this.loadReport();
    this.counter();

  }

  ngOnInit() { }

  _trayDetails: any
  _count: string[] = [];
  _test: any
  _a: any
  statusAir: any
  statusOven: any
  loadReport() {
    this.apiService.trayDetails().subscribe(data => {
      this._trayDetails = data
      console.log(typeof (this._trayDetails), "hello")

      for (let i = 0; i < this._trayDetails.length; i++) {
        this._test = this._trayDetails[i].dateTime;
        if (this._trayDetails[i].process == 'Air Dry') {

          this._a = moment(this._test).add(1, 'days').format('MMMM Do YY, h:mm:ss a');
          if (this._a == moment(this._test).add(1, 'days').format('MMMM Do YYYY, h:mm:ss a')) {
            this.statusAir = "completed";
            console.log(this.statusAir, "air")
          }
          this._count.push(this._a)
        }
        else if (this._trayDetails[i].process == 'Oven Dry') {
          this._a = moment(this._test).add(2, 'days').format('MMMM Do YYYY, h:mm:ss a');
          if (this._a == moment(this._test).format('MMMM Do YYYY, h:mm:ss a')) {

            this.statusOven = "completed";
            console.log(this.statusOven, "air")
          }
          this._count.push(this._a)
        }
      }
    })
  }

  _hour: any
  _minutes: any
  _sec: any

  counter()  {
    let eventTime:any = 54545454988;
    console.log(eventTime, "eventtime")
    let currentTime:any = 55686533;
    let diffTime:any = eventTime - currentTime;
    let duration:any =  moment.duration(diffTime * 1000, 'milliseconds');
    let interval = 1000;

    let final = setInterval(async () => {
      let result = moment.duration(duration - interval, 'milliseconds');
      this._hour = result.hours();
      this._minutes = result.minutes();
      this._sec = result.seconds();
    }, interval);


  }
}
