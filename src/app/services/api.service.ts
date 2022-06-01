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

  updateTrayDetails = (params: any): Observable<any> => {
    const url = this.getInputApiUrl('UpdateTrayDetail');
    return this.http.put(url, params);
  }
  insertEntity = (params: any): Observable<any> => {
    const url = this.getInputApiUrl('AddTrayDetail');
    return this.http.post(url, params);
  }

  updateEntity = (params: any): Observable<any> => {
    const url = this.getInputApiUrl('UpdateTrayDetail');
    return this.http.put(url, params);
  }


  trayDetails = (): Observable<any> => {
    const url = this.getInputApiUrl('GetTrayDetails');
    return this.http.get(url);
  }

  filterItem = (params: any): Observable<any> => {
    const url = this.getInputApiUrl('FilteredItems');
    return this.http.post(url, params);
  }

  getExcelReport = (params: any): Observable<any> => {
    const url = this.getInputApiUrl('GenerateExcel');
    return this.http.post(url, params, {     
      responseType: 'blob'
    });
  }

  addUser = (params: any): Observable<any> => {
    const url = this.getUserApiUrl('AddUser');
    return this.http.post(url, params);
  }

  updateUser = (params: any): Observable<any> => {
    console.log('geetha')
    const url = this.getUserApiUrl('UpdateLogin');
    return this.http.put(url, params);
  }


  deleteUser = (params: number): Observable<any> => {
    const url = this.getUserApiUrl('DeletUser?id=');
    return this.http.delete(url + params);
  }

  checkUser = (User: any): Observable<any> => {
    const url = this.getUserApiUrl('UserExist?obj=');
    return this.http.get(url + User);
  }

}
