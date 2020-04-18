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
  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private menu: MenuController,
    private navController: NavController,
    private loadingController: LoadingController, 
  ) {
  	this.getBillOfQtys();
  }

  ngOnInit() {

  }

  getBillOfQtys(): any {  
    this.storage.get('mobile_account').then(mobileAccount => {  

      let params = new FormData();
      params.append('boq_project_id', mobileAccount.ma_project_id);

      this.apiService.getBillOfQtys(params).then(response => {
        this.billOfQtys = response;
        console.log(response);
      });   
    });
 
  }

}
