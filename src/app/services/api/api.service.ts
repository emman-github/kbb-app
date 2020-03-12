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
  	//this.baseUrl = 'http://localhost/KBB/index.php/Welcome/';
  	this.baseUrl = 'http://kbb-back-end.000webhostapp.com/index.php/Welcome/';
  }

  login(): Promise<any> {

    const promise = new Promise((resolve, reject) => { 
      let url: string = this.baseUrl + 'login';  

      let params = new FormData(); 
 
      this.httpClient.get(url).subscribe(response => {
        resolve(response);
      }, error => {
        alert(JSON.stringify(error));
      });
    });

    return promise;
  }  
}
