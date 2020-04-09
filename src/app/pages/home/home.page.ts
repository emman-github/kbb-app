import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import {
  MenuController, NavController, AlertController, LoadingController, ToastController,
  IonContent, ModalController
} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
  	private apiService: ApiService,
  	private storage: Storage,
  	private menuController: MenuController
  ) {

  }

  ngOnInit() {
  	this.getProject();
  }

  async getProject() {
  	this.storage.get('mobile_account').then(mobileAccount => {
  		mobileAccount = JSON.parse(mobileAccount);
  		console.log(mobileAccount);
  		let params = new FormData();  
    	params.append('project_desktop_id', mobileAccount.ma_project_id); 

  		this.apiService.getProject(params).then(response => {
      console.log(response);
      if (response.length > 0) {
        // this.loading.dismiss(); 
      } else {
        // this.loading.dismiss();
        alert('Incorrect username and password');
      }
  		});
  	});
  	
  } 

}
