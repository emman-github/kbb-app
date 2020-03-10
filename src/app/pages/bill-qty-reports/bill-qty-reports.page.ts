import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-qty-reports',
  templateUrl: './bill-qty-reports.page.html',
  styleUrls: ['./bill-qty-reports.page.scss'],
})
export class BillQtyReportsPage implements OnInit {
  billQtyReports: Array<any>	 
  constructor() {
  	this.billQtyReports = this.getBillQtyReports();
  }

  ngOnInit() {
  }

  getBillQtyReports(): any {  
  }

}
