import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  userService = inject(UserService);
  showHeader:boolean = true;

  ngOnInit(){
    this.userService.showHeader.subscribe((res:any)=>{
        this.showHeader = res;
    });
  }
}
