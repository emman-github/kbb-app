import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import {
  MenuController, NavController, AlertController, LoadingController, ToastController,
  IonContent, ModalController
} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-daily-report',
  templateUrl: './add-daily-report.page.html',
  styleUrls: ['./add-daily-report.page.scss'],
})
export class AddDailyReportPage implements OnInit {
  schedulesOfWork: any;
  selectedScheduleOfWork: any;
  workers: any;
  checkedWorkers: Array<any>;
  vehicleType: any;
  vehiclePlateNumber: any;
  odometerStart: any;
  odometerEnd: any;
  overtimeStart: any;
  overtimeEnd: any;
  areaRemarks: any;
  materialUsed: any;
  day: any;
  loading: any;

  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private menu: MenuController,
    private navController: NavController,
    private loadingController: LoadingController, 
  ) {
  	this.checkedWorkers = [];

   //  this.skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  async ngOnInit() {
  	this.loading = await this.loadingController.create({
      message: ''
    });

    await this.loading.present().then(async() => {
	  	await this.getSchedulesOfWork().then(async() => {
	  		await this.getWorkers().then(async() => {
	  			await this.getCurrentDay().then(async() => {
	  				await this.loading.dismiss();
	  			});
	  		});
	  	});     	
    }); 
  }

  async getSchedulesOfWork(): Promise<any> {  
    this.storage.get('mobile_account').then(mobileAccount => {  

      let params = new FormData();
      params.append('sow_project_id', mobileAccount.ma_project_id);

      this.apiService.getSchedulesOfWork(params).then(response => {
        this.schedulesOfWork = response;
        // this.billOfQtyWorksCompleted = response[0].boq_works_completed;
        console.log(this.schedulesOfWork);
        console.log(response);


      });   
    });
 
  }

  async getWorkers(): Promise<any> {  
    this.storage.get('mobile_account').then(mobileAccount => {  

      let params = new FormData();
      params.append('worker_project_id', mobileAccount.ma_project_id);

      this.apiService.getWorkers(params).then(response => {
        this.workers = response;

        for (let i = 0; i < this.workers.length; i++) {
        	this.workers[i].is_checked = false;
        }
        // this.billOfQtyWorksCompleted = response[0].boq_works_completed;
        console.log(this.workers);
        console.log(response);


      });   
    });
 
  }  

  onScheduleOfWorkChange() {
  	console.log(this.selectedScheduleOfWork);
  }

  onCheckWorker(worker) {
  	const index = this.checkedWorkers.indexOf(worker);
  	if (index < 0) {
    	this.checkedWorkers.push(worker);
  	} else {
  		this.checkedWorkers.splice(index, 1);
  	}

  	console.log(this.checkedWorkers);
  }

  async submit(): Promise<any> {
  	this.loading = await this.loadingController.create({
      message: 'Submitting. . . '
    });

    await this.loading.present();
    this.storage.get('mobile_account').then(mobileAccount => { 

      let dateTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

      let params = new FormData();
      const manpower = JSON.stringify(this.checkedWorkers);
      console.log(manpower);
      // params.append('report_day', mobileAccount.ma_project_id);
      params.append('report_day', this.day);
      params.append('report_datetime', dateTime);
      params.append('report_materialUsed', this.materialUsed);
      params.append('report_area_remarks', this.areaRemarks);
      params.append('report_vehicle_type', this.vehicleType);
      params.append('report_vehicle_plateNo', this.vehiclePlateNumber);
      params.append('report_odemeter_reading_start', this.odometerStart);
      params.append('report_odemeter_reading_end', this.odometerEnd);
      params.append('report_overtime_start', this.overtimeStart);
      params.append('report_overtime_end', this.overtimeEnd);
      params.append('report_schedule_of_work_id', this.selectedScheduleOfWork.soq_desktop_id);
      params.append('report_project_id', mobileAccount.ma_project_id);
      // params.append('manpower', manpower);

      this.apiService.submitReport(params).then(savedReport => {
        console.log(savedReport.insert_id);
        for (let i = 0; i < this.checkedWorkers.length; i++) {
        	let params = new FormData();
        	params.append('mp_worker_id', this.checkedWorkers[i].worker_desktop_id);
      		params.append('mp_report_id', savedReport.insert_id);

		      this.apiService.saveSpecificManpower(params).then(response => {
		        

		      }).catch(error => {
		      	   this.loading.dismiss().then(() => {
        		alert('Error in submitting report');
        	});
		      });           	 
        }  

        this.loading.dismiss().then(() => {
        	this.checkedWorkers = [];
        	this.selectedScheduleOfWork = undefined;  
        	this.vehicleType = undefined; 
        	this.vehiclePlateNumber = undefined; 
        	this.overtimeStart = undefined; 
        	this.overtimeEnd = undefined;
        	this.odometerStart = undefined; 
        	this.odometerEnd = undefined; 
        	this.areaRemarks = undefined; 
        	this.materialUsed = undefined;
        	        for (let i = 0; i < this.workers.length; i++) {
        	this.workers[i].is_checked = false;
        }
			        alert('Daily Accomplishment has been saved');
			      });
      });   
    }).catch(error => {
        this.loading.dismiss().then(() => {
        	alert('Error in submitting report');
        });    	
    });  	
  }

  async getCurrentDay(): Promise<any> {
    this.storage.get('mobile_account').then(mobileAccount => {  
    	let dateTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
      let params = new FormData();
      params.append('project_desktop_id', mobileAccount.ma_project_id);
      params.append('date_time', dateTime);

      this.apiService.getCurrentDay(params).then(response => {
      	this.day = response.day;
      	console.log(this.day);
      });   
    });  	
  }

  hasValues() { 
  	if (this.selectedScheduleOfWork && this.vehicleType && this.vehiclePlateNumber && this.checkedWorkers && this.odometerStart && this.odometerEnd &&  this.overtimeStart && this.overtimeEnd && this.areaRemarks && this.materialUsed) {
      return false;
  	}

  	return true;
  }

}
