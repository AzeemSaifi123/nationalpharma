import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  userData:any;
  userService = inject(UserService);
 
  ngOnInit(){
    this.userService.getQuery().subscribe((result:any) =>{
       this.userData = result['queries'];
       // console.log(result['queries'],"queries data")
    }); 
  }

}
