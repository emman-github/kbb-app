import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDailyReportPageRoutingModule } from './add-daily-report-routing.module';

import { AddDailyReportPage } from './add-daily-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDailyReportPageRoutingModule
  ],
  declarations: [AddDailyReportPage]
})
export class AddDailyReportPageModule {}
