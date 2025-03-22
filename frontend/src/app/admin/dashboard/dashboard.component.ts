import { Component, inject,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsideComponent } from "../aside/aside.component";
import { UserService } from '../../services/user.service';
import { OrderComponent } from "../order/order.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SalesGraphComponent } from '../sales-graph/sales-graph.component';


@Component({
  selector: 'app-dashboard',
  imports: [AsideComponent, CommonModule, HeaderComponent,SalesGraphComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent {

  userService = inject(UserService);

  ngOnInit(){
     this.userService.showHeader.next(false);  
   }

  ngOnDestory(){
      this.userService.showHeader.next(true)
  }

}
