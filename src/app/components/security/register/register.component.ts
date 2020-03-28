import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends TranslatableComponent implements OnInit {

  registrationForm: FormGroup;
  roleList: string[];

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private translateService: TranslateService) {
    super(translateService);
    this.roleList = this.authService.getRoles();
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      address: [''],
      phone: [''],
      role: [''],
    });
  }

  onRegister() {
    this.authService.registerUser(this.registrationForm.value)
    .then(res => {
      console.log(res); 
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }

}
