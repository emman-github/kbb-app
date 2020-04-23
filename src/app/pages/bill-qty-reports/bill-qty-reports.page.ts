import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import {
  MenuController, NavController, AlertController, LoadingController, ToastController,
  IonContent, ModalController
} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-bill-qty-reports',
  templateUrl: './bill-qty-reports.page.html',
  styleUrls: ['./bill-qty-reports.page.scss'],
})
export class BillQtyReportsPage implements OnInit {
  billOfQtys: Array<any>	 
  billOfQtyWorksCompleted: any;
  skeletonItems: any;
  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private menu: MenuController,
    private navController: NavController,
    private loadingController: LoadingController, 
  ) {
  	this.getBillOfQtys();
    this.skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit() {

  }

  getBillOfQtys(): any {  
    this.storage.get('mobile_account').then(mobileAccount => {  

      let params = new FormData();
      params.append('boq_project_id', mobileAccount.ma_project_id);

      this.apiService.getBillOfQtys(params).then(response => {
        this.billOfQtys = response;
        // this.billOfQtyWorksCompleted = response[0].boq_works_completed;
        console.log(this.billOfQtyWorksCompleted);
        console.log(response);
      });   
    });
 
  }

  add(billOfQty): any {  
    console.log(billOfQty.boq_works_completed_temp);
    if (parseInt(billOfQty.boq_works_completed_temp) < parseInt(billOfQty.boq_quantity_of_work)) {
      billOfQty.boq_works_completed_temp++; 
       console.log(billOfQty.boq_works_completed_temp);
    }  

    console.log(billOfQty.boq_works_completed_temp);
      // let params = new FormData();
      // params.append('boqh_day', billOfQty.boqh_day);
      // params.append('boqh_datetime', billOfQty.ma_project_id);
      // params.append('boqh_works_completed', billOfQty.ma_project_id);
      // params.append('boqh_boq_id', billOfQty.boqh_boq_id);

      // this.apiService.getBillOfQtys(params).then(response => {
      //   this.billOfQtys = response;
      //   console.log(response);
      // });      
  }

  subtract(billOfQty): any {   

    if (parseInt(billOfQty.boq_works_completed_temp) > 0) {
      billOfQty.boq_works_completed_temp--; 
    }       

    console.log(billOfQty.boq_works_completed_temp);
  }

  isZero(billOfQty): any {
    // console.log(billOfQty.boq_works_completed);
    if (billOfQty.boq_works_completed_temp === undefined) {
      billOfQty.boq_works_completed_temp = billOfQty.boq_works_completed;
    }
    return parseInt(billOfQty.boq_works_completed_temp) === 0;
  }

  isMax(billOfQty): any {
    // console.log(billOfQty.boq_works_completed);
    if (billOfQty.boq_works_completed_temp === undefined) {
      billOfQty.boq_works_completed_temp = billOfQty.boq_works_completed;
    }
    return parseInt(billOfQty.boq_works_completed_temp) === parseInt(billOfQty.boq_quantity_of_work);
  }  

  hasBeenUpdated(billOfQty): any {
    return parseInt(billOfQty.boq_works_completed_temp) === parseInt(billOfQty.boq_works_completed);
  }

  update(billOfQty): any {
    console.log(billOfQty);
    console.log(new Date().toLocaleString());
    let dateTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
 
    console.log(dateTime);
      let params = new FormData();
      params.append('boqh_day', '0');
      params.append('boqh_datetime', dateTime);
      params.append('boqh_works_completed', billOfQty.boq_works_completed_temp);
      params.append('boqh_boq_id', billOfQty.boq_desktop_id);
      params.append('boq_project_id', billOfQty.boq_project_id);

      console.log(params);
      // return;
      this.apiService.updateBillOfQuantity(params).then(response => {
        alert('History has been saved.')
        billOfQty.boq_works_completed = billOfQty.boq_works_completed_temp;
        billOfQty.boq_works_completed_temp = undefined;
        console.log(response);
      });      
  }

}
