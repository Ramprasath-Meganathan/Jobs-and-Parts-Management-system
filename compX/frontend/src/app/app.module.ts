import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobItemComponent } from './jobs/job-item/job-item.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateEditJobComponent } from './jobs/create-edit-job/create-edit-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditPartComponent } from './jobs/create-edit-job/create-edit-part/create-edit-part.component';
import { OrdersComponent } from './orders/orders.component';
import { UpdateJobComponent } from './jobs/update-job/update-job.component';

@NgModule({
  declarations: [
    AppComponent,
    JobItemComponent,
    CreateEditJobComponent,
    CreateEditPartComponent,
    OrdersComponent,
    UpdateJobComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
