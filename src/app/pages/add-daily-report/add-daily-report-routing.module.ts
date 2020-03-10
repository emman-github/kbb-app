import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDailyReportPage } from './add-daily-report.page';

const routes: Routes = [
  {
    path: '',
    component: AddDailyReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDailyReportPageRoutingModule {}
