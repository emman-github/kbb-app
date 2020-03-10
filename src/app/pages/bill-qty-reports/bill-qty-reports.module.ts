import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillQtyReportsPageRoutingModule } from './bill-qty-reports-routing.module';

import { BillQtyReportsPage } from './bill-qty-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillQtyReportsPageRoutingModule
  ],
  declarations: [BillQtyReportsPage]
})
export class BillQtyReportsPageModule {}
