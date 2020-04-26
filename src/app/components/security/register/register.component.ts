import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends TranslatableComponent implements OnInit {

  registrationForm: FormGroup;
  roleList: string[];
  map: Map;

  constructor(private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private translateService: TranslateService) {
    super(translateService);
    this.roleList = this.authService.getRoles();
    this.createForm();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [213079.7791264898, 4929220.284081122],
        zoom: 5
      }),
    });
  }

  getCoord(event: any){
    var coordinate = this.map.getEventCoordinate(event);
    console.log(coordinate)
  }

  createForm() {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      address: [''],
      phoneNumber: [''],
      role: ['EXPLORER'],
      banned: [false]
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
