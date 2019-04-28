import { Component, OnInit } from '@angular/core';
import { TableService } from '../tableview/table.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private tableService: TableService,
    private route: ActivatedRoute,
    private router: Router) { }
  public users = [];
  public user: String;
  public localUsers = [];
  public dataOfCurrentUser: any;
  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('id');
    this.tableService.getTableData().subscribe((data) => {
      this.setDataForUser(data['users'])
    });
  }
  // getting current user to display detail page
  public setDataForUser(allUsers) {
    const users = [];
    this.localUsers = (JSON.parse(localStorage.getItem('users')) || []);
    this.localUsers.forEach((element) => {
      const user = {};
      user['name'] = element.name;
      user['email'] = element.email;
      user['phone'] = element.phone;
      user['dob'] = element.dob;
      user['active'] = element.active;
      users.push(user);
    });
    allUsers.map((userObject) => {
      if ((userObject.first_name + ' ' + userObject.last_name) === this.user) {
        this.dataOfCurrentUser = userObject;
      }
    });
    users.map((userObject) => {
      if ((userObject.name) === this.user) {
        this.dataOfCurrentUser = userObject;
      }
    });
  }
  // click of back button
  public goBack() {
    this.router.navigate(['tableview'])
  }
}
