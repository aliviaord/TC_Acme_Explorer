import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  roleList: string[];

  constructor(private authService: AuthService, private fb: FormBuilder) {
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
    })
  }

  onRegister() {
    this.authService.registerUser(this.registrationForm.value)
    .then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

}
