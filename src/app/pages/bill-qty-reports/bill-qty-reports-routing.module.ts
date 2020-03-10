import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillQtyReportsPage } from './bill-qty-reports.page';

const routes: Routes = [
  {
    path: '',
    component: BillQtyReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillQtyReportsPageRoutingModule {}
