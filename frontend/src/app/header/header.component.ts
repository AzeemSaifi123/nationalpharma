import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userService = inject(UserService);
  showHeader:boolean = true;

  ngOnInit(){
    this.userService.showHeader.subscribe((res:any)=>{
        this.showHeader = res;
    });
  }

}
