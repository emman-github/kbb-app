import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
  	private apiService: ApiService
  ) {

  }

  ngOnInit() {
  	//this.login();
  }

  login() {
  	this.apiService.login().then(data => {
  	  console.log(data);
  	});
  }

}
