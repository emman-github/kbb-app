import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import {
  MenuController, NavController, AlertController, LoadingController, ToastController,
  IonContent, ModalController
} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  loading: any;

  constructor(
  	private apiService: ApiService,
    private storage: Storage,
    private menu: MenuController,
    private navController: NavController,
    private loadingController: LoadingController
  ) {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {
  	// this.login();
  }

  async login() {
    this.loading = await this.loadingController.create({
      message: 'Logging in . . . '
    });
    await this.loading.present();

    let params = new FormData();  
    params.append('ma_username', this.username);
    params.append('ma_password', this.password);

  	this.apiService.login(params).then(response => {
      console.log(response.length);
      if (response.length > 0) {
        this.storage.set('mobile_account', response[0]).then(() => {
          this.username = '';
          this.password = '';
          this.loading.dismiss();
        this.navController.navigateForward(['/home']);
        });
        
      } else {
        this.loading.dismiss();
        alert('Incorrect username and password');
      }
  	});
  } 

}
