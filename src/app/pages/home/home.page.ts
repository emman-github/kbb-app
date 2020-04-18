import { Component, OnInit } from '@angular/core'; 
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
	project: any;
	mobileAccount: any;

  constructor(
  	private apiService: ApiService,
  	private storage: Storage,
  	private menuController: MenuController
  ) {

  }

  async ngOnInit() {
  	await this.getProject();
  }

  async getProject() {
  	this.storage.get('mobile_account').then(mobileAccount => {
      console.log(mobileAccount);
  		// mobileAccount = JSON.parse(mobileAccount);
  		this.mobileAccount = mobileAccount;
  		console.log(mobileAccount);
  		let params = new FormData();  
    	params.append('project_desktop_id', mobileAccount.ma_project_id); 

  		this.apiService.getProject(params).then(project => {
        console.log(project);
      if (project.length > 0) {
        // this.loading.dismiss();  
      	this.project = project[0];
      	console.log(this.project.project_contractor);
      } else {
        // this.loading.dismiss();
        alert('You have no current project');
      }
  		});
  	});
  	
  } 

}
