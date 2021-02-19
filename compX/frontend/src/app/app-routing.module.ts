import { JobItemComponent } from './jobs/job-item/job-item.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import {UpdateJobComponent} from './jobs/update-job/update-job.component';

const routes: Routes = [
  { path: '', component: JobItemComponent, pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent},
  { path: 'edit/:jobName', component: UpdateJobComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
