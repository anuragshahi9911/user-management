import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';
import { User } from '../model/user';
import { Router } from '@angular/router';


@Component({
    selector: 'app-tableview',
    templateUrl: './tableview.component.html',
    styleUrls: ['./tableview.component.scss'],
})
export class TableviewComponent implements OnInit {

    constructor(private tableService: TableService,
        private router: Router) { }
   public users = [];
   public isAddUserClicked = false;
   public cols: any[];
   public localUsers: any;
   public editField: String;
    ngOnInit() {
        this.tableService.getTableData().subscribe((data) => {
            data['users'].forEach(element => {
                const user = {};
                user['name'] = element.first_name + ' ' + element.last_name;
                user['email'] = element.email;
                user['phone'] = element.phone;
                user['dob'] = element.dob;
                user['active'] = element.active;
                user['editable'] = false;
                let timeDiff = Math.abs(Date.now() - element.dob);
                user['age'] = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25) + ' years';
                this.users.push(user);
            });
        });
        this.localUsers = (JSON.parse(localStorage.getItem('users')) || []);
        this.localUsers.forEach((element) => {
            const user = {};
            user['name'] = element.name;
            user['email'] = element.email;
            user['phone'] = element.phone;
            user['dob'] = element.dob;
            user['editable'] = false;
            user['active'] = element.active;
            let timeDiff = Math.abs(Date.now() - new Date(element.dob).getTime());
            user['age'] = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25) + ' years';
            this.users.push(user);
        });
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'email', header: 'Email' },
            { field: 'phone', header: 'Phone' },
            { field: 'dob', header: 'Date of Birth' },
            { field: 'age', header: 'Age' },
            { field: 'active', header: 'Status' },
            { field: 'action', header: 'Action' }
        ];
    }
    // adding new user to the table
    public addUserToTable(event: any) {
        if (event === 'false') {
            this.isAddUserClicked = false;
        } else {
            this.isAddUserClicked = false;
            const user = {};
            user['name'] = event.name;
            user['email'] = event.email;
            user['phone'] = event.phone;
            user['dob'] = event.dob;
            user['editable'] = false;
            user['age'] = event.age;
            /// user['active'] = element.active;
            this.users.push(user);
        }
    }
    // click of add user button
    public addUser() {
        this.isAddUserClicked = true;
    }
    public viewUser(user) {
        this.router.navigate(['detail/' + user.name])
    }
    // enable edit mode for table row
    public edit(property: any) {
        let temp = [];
        if (localStorage.getItem('users')) {
            const localUsers: Array<String> = JSON.parse(localStorage.getItem('users'));
            localUsers.forEach((element: any) => {
                if ((element.firstName + ' ' + element.lastName) === property.name) {
                    element.editable = true;
                }
                temp.push(element);
            });
        }
        localStorage.setItem('users', JSON.stringify(temp));
        this.users.forEach((data) => {
            if (data.name === property.name) {
                data.editable = true;
            }
        });
    }
    public activateUser(user) {
        let temp = [];
        if (localStorage.getItem('users')) {
            const localUsers: Array<String> = JSON.parse(localStorage.getItem('users'));
            localUsers.forEach((element: any) => {
                if ((element.email) === user.email) {
                    element.active = true;
                }
                temp.push(element);
            });
        }
        localStorage.setItem('users', JSON.stringify(temp));
        this.users.forEach((data) => {
            if ((data.email) === user.email) {
                data.active = true;
            }
        });
    }
    public deactiveUser(user) {
        let temp = [];
        if (localStorage.getItem('users')) {
            const localUsers: Array<String> = JSON.parse(localStorage.getItem('users'));
            localUsers.forEach((element: any) => {
                if ((element.email) === user.email) {
                    element.active = false;
                }
                temp.push(element);
            });
        }
        localStorage.setItem('users', JSON.stringify(temp));
        this.users.forEach((data) => {
            if ((data.email) === user.email) {
                data.active = false;
            }
        });
    }
    public changeValue(property: string, id: string, event: any) {
        const editField = event.target.textContent;
        let temp = [];
        if (localStorage.getItem('users')) {
            const localUsers: Array<String> = JSON.parse(localStorage.getItem('users'));
            localUsers.forEach((element: any) => {
                if ((element.firstName + ' ' + element.lastName) === property) {
                    element.editable = true;
                }
                temp.push(element);
            });
        }
        localStorage.setItem('users', JSON.stringify(temp));
        this.users.forEach((data) => {
            if (data.name === property) {
                data.editable = true;
            }
        });
        this.editField = event.target.textContent;
    }
    // updating changes for edit operation
    public updateList(property: string, row: any, id: string, event: any) {
        const editField = event.target.textContent;
        let temp = [];
        if (localStorage.getItem('users')) {
            const localUsers: Array<String> = JSON.parse(localStorage.getItem('users'));
            localUsers.forEach((element: any) => {
                element.editable = false;
                if ((element.email) === row.email) {
                    let timeDiff = Math.abs(Date.now() - new Date(row.dob).getTime());
                    row['age'] = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25) + ' years';
                    element = row;
                }
                temp.push(element);
            });
        }
        localStorage.setItem('users', JSON.stringify(temp));
        this.users.forEach((data) => {
            data.editable = false;
            if (data.email === row.email) {
                let timeDiff = Math.abs(Date.now() - new Date(row.dob).getTime());
                row['age'] = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25) + ' years';
                data = row;
            }
        });
    }
}
