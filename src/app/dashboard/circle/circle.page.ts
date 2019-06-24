import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../service/customer.service'

@Component({
  selector: 'app-circle',
  templateUrl: './circle.page.html',
  styleUrls: ['./circle.page.scss'],
})
export class CirclePage implements OnInit {

  orders
  currentUser 

  constructor(private customerservice: CustomerService) { }

  ngOnInit() {
    this.currentUser = this.customerservice.get_current_user()
    this.orders = this.customerservice.orders(this.currentUser.id).subscribe((resp)=>{
      console.log(resp)
})
}
}
