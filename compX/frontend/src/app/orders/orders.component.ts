import {Component, OnDestroy, OnInit} from '@angular/core';
import { JobService } from '../shared/services/job.service';
import {Subscription} from 'rxjs';
import {OrderItem} from '../shared/models/order-item.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders: OrderItem[] = [];
  error = null;
  orderSub: Subscription;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.onFetchOrders();
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }

  onFetchOrders() {
    this.orderSub = this.jobService.fetchOrders().subscribe(
        orders => {
          this.orders = orders;
        },
        error => {
          this.error = error.message;
        }
    );
  }
}
