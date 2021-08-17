import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {

  constructor(private userService: UsersServiceService) { }
  users: Array<User> = new Array();
  ngOnInit() {
    this.userService.getUsers(localStorage.getItem('token'))
    .toPromise()
    .then((res: any)=>{
      this.users = res.users;
    })
    .catch(err=>{
      console.log(err);
    })
  }

}
