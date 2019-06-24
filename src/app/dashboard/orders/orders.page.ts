import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders
  currentUser 
  item

  constructor(private customerservice: CustomerService) { }

  ngOnInit() {
    this.currentUser = this.customerservice.get_current_user()
    this.customerservice.orders(this.currentUser.id).subscribe((data)=> {
    this.orders = data['orders']
    })
  }


}
