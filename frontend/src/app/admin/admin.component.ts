import { Component, inject,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { UserService } from '../services/user.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [AsideComponent, HeaderComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
    userService = inject(UserService);
  
    ngOnInit(){
       this.userService.showHeader.next(false);  
     }
  
    ngOnDestory(){
        this.userService.showHeader.next(true)
    }
}
