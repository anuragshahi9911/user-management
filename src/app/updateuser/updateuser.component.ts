import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateuserComponent implements OnInit {
  @Output()
  addedUser = new EventEmitter();
  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  public close() {
    this.addedUser.emit('false');
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  // saving user to local storage
  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    let temp = [];
    if (localStorage.getItem('users')) {
      const localUsers: Array<String> = JSON.parse(localStorage.getItem('users'));
      localUsers.forEach(element => {
        temp.push(element);
      });
    }
    const user = {};
    if (this.registerForm.value) {
      user['name'] = this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName;
      user['email'] = this.registerForm.value.email;
      user['phone'] = this.registerForm.value.mobile;
      user['dob'] = this.registerForm.value.dob;
      user['editable'] = false;
      user['active'] = '';
      let timeDiff = Math.abs(Date.now() - new Date(this.registerForm.value.dob).getTime());
      user['age'] = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25) + ' years';
      temp.push(user)
    }
   
    localStorage.setItem('users', JSON.stringify(temp));
    this.addedUser.emit(user);
  }
}
