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
    // this.baseUrl = 'http://192.168.43.84/kbb-back-end/index.php/Welcome/';
  	// this.baseUrl = 'http://localhost/kbb-back-end/index.php/Welcome/';
  	this.baseUrl = 'https://kbb-back-end.000webhostapp.com/index.php/Welcome/';
  }

  login(params): Promise<any> {   
    return this.httpRequest(params, 'login');
  }  

  getProject(params): Promise<any> {  
    return this.httpRequest(params, 'select_project');
  }    

  getBillOfQtys(params): Promise<any> {    
    return this.httpRequest(params, 'get_bill_of_quantities');
  }   

  updateBillOfQuantity(params): Promise<any> {
    return this.httpRequest(params, 'save_bill_of_quantity_history');   
  }

  getSchedulesOfWork(params): Promise<any> {
    return this.httpRequest(params, 'get_schedules_of_work');   
  }

  getWorkers(params): Promise<any> {
    return this.httpRequest(params, 'get_workers');   
  }  

  submitReport(params): Promise<any> {
    return this.httpRequest(params, 'submit_report');   
  }

  getCurrentDay(params): Promise<any> {
    return this.httpRequest(params, 'get_current_day');   
  }      

  saveSpecificManpower(params): Promise<any> {
    return this.httpRequest(params, 'save_specific_manpower');   
  }         

  httpRequest(params, functionName): Promise<any> {
    return new Promise((resolve, reject) => { 
      let url: string = this.baseUrl + functionName;  
 
      this.httpClient.post(url, params).subscribe((response: any) => {
        // response = JSON.parse(response);
        console.log(response);
        resolve(response);
      }, error => {
        reject(error);
        // alert(JSON.stringify(error));
      });
    });
  }
}
