import { Component, OnInit } from '@angular/core';
import {
  MenuController, NavController, AlertController, LoadingController, ToastController, IonContent, ModalController
} from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
	pageName: string;

  constructor(
  	private menuController: MenuController,
  	private navController: NavController,
  	private alertController: AlertController 
  ) { }

  ngOnInit() {

  }

  async openPage(pageName) {

  	this.pageName = pageName;
  	console.log(this.pageName)
  	if (this.pageName === 'login') {
  		this.presentLogoutAlert();
  	} else {
      await this.navController.navigateForward([this.pageName]).then(async() => {
        await this.menuController.close();
      });       
    }
  }

	async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Sign out',
      message: 'Are you sure you want to sign out your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async() => {
				  	await this.navController.navigateForward([this.pageName]).then(async() => {
				  		await this.menuController.close();
				  	}); 
          }
        }
      ]
    });

    await alert.present();
  }

}
