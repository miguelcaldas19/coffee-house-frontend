import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';

import { ProductsComponent } from './products/products.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    // canActivateChild: [AuthChildGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'notifications', component: NotificationsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }


