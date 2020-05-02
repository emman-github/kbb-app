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
    loading: any;

  constructor(
  	private apiService: ApiService,
  	private storage: Storage,
  	private menuController: MenuController,
    private loadingController: LoadingController 
  ) {

  }

  async ngOnInit() {
  	 await this.getProject();
  }

  async ionViewWillEnter() {
   
  }

  async getProject() {
    this.project = null;
    console.log('getProject()');
      this.loading = await this.loadingController.create({
      message: ''
    });

    await this.loading.present();
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
        this.loading.dismiss();
      } else {
        // this.loading.dismiss();
        alert('You have no current project');
        this.loading.dismiss();
      }
  		});
  	});
  	
  } 

  isNotYetCompleted(project) {
    return project.project_dateCompleted.includes('1753');
  }

}
