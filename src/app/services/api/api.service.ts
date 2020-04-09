import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string;

  constructor(
  	private httpClient: HttpClient
  ) {
  	this.baseUrl = 'http://localhost/kbb-back-end/index.php/Welcome/';
  	//this.baseUrl = 'http://kbb-back-end.000webhostapp.com/index.php/Welcome/';
  }

  login(params): Promise<any> {  
    const promise = new Promise((resolve, reject) => { 
      let url: string = this.baseUrl + 'login';  
 
      this.httpClient.post(url, params).subscribe(response => {
        resolve(response);
      }, error => {
        alert(JSON.stringify(error));
      });
    });

    return promise;
  }  

  getProject(params): Promise<any> {  
    const promise = new Promise((resolve, reject) => { 
      let url: string = this.baseUrl + 'select_project';  
 
      this.httpClient.post(url, params).subscribe(response => {
        resolve(response);
      }, error => {
        alert(JSON.stringify(error));
      });
    });

    return promise;
  }   
}
