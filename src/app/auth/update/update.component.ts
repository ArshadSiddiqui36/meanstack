import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})


export class UpdateComponent implements OnInit {


  id:string = this.auth.getUserId();
  firstName:string = this.auth.getUserFirstName();
  lastName:string = this.auth.getUserLastName();
  email:any = this.auth.getUserEmail();
  phone:string = this.auth.getUserPhone();
  work:string = this.auth.getUserWork();


  formData: any = {
    id: this.id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone,
    work: this.work
  };

  errors: any = [];

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }



  update(): void {
    this.errors = [];
    this.auth.update(this.formData)
      .subscribe((token) => {
        this.router.navigate(['/profile'], { queryParams: { updated: 'success' } });
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }





}

