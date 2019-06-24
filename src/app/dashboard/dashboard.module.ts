import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children:[
      { path: 'orders' , loadChildren:'../dashboard/orders/orders.module#OrdersPageModule'},
      { path: 'circle', loadChildren: '../dashboard/circle/circle.module#CirclePageModule' },
      { path: 'sales', loadChildren: '../dashboard/sales/sales.module#SalesPageModule'}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
