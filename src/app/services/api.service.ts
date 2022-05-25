import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private InputApi = 'Tracking';
  private UserApi = 'User';

  constructor(private http: HttpClient) { }


  getInputApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.InputApi}/${endpoint}`;
  }

  getUserApiUrl = (endpoint: string) => {
    return `${environment.baseURL}/${this.UserApi}/${endpoint}`;
  }

  doLogin = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('GetLogin');
    return this.http.post(url, params);
  }

  logout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('isSuperUser');
    localStorage.removeItem('Role');
  }

  insertEntity = (params: any): Observable<any> => {
    const url = this.getInputApiUrl('AddTrayDetail');
    return this.http.post(url, params);
  }

  trayDetails = (): Observable<any> => {
    const url = this.getInputApiUrl('GetTrayDetails');
    return this.http.get(url);
  }

  filterItem = (params: any): Observable<any> => {
    const url = this.getInputApiUrl('FilteredItems');
    return this.http.post(url, params);
  }

  addUser = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('AddUser');
    return this.http.post(url, params);
  }

  updateUser = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('UpdateLogin');
    return this.http.post(url, params);
  }
  deleteUser = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('DeletUser');
    return this.http.post(url, params);
  }

  // deleteEntity = (params: any): Observable<any> => {
  //   const url = this.getInputApiUrl('UpdateTraydetail');
  //   return this.http.post(url, params);
  // }

  // filterItem = (params: any): Observable<any> => {
  //   const url = this.getInputApiUrl('FilteredItems');
  //   return this.http.post(url, params);
  // }

  // getExcelReport = (params: any): Observable<HttpResponse<ArrayBuffer>> => {
  //   const url = this.getInputApiUrl('GenerateExcel');
  //   return this.http.post(url, params, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/octet-stream',
  //       'Accept': 'application/octet-stream',
  //     }),
  //     observe: 'response',
  //     responseType: 'arraybuffer'
  //   });
  // }

}
