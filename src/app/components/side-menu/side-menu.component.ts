import { Component, OnInit } from '@angular/core';
import {
  MenuController, NavController, AlertController, LoadingController, ToastController, IonContent, ModalController
} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
	pageName: string;
    loading: any;

  constructor(
  	private menuController: MenuController,
  	private navController: NavController,
  	private alertController: AlertController,
    private storage: Storage,
        private loadingController: LoadingController
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
          handler: async(blah) => {
            console.log('Confirm Cancel: blah');
            await this.menuController.close();
          }
        }, {
          text: 'Okay',
          handler: async() => {



            this.loading = await this.loadingController.create({
              message: 'Signing out . . . '
            });
            await this.loading.present();

             this.storage.clear().then(() => {
                this.storage.set('mobile_account', null).then(async() => {
            await this.navController.navigateForward([this.pageName]).then(async() => {
              this.loading.dismiss();
              await this.menuController.close();
            }); 
                })
             });


          }
        }
      ]
    });

    await alert.present();
  }

  onLogoImageLoad() {
    // alert(1);
  }

}
