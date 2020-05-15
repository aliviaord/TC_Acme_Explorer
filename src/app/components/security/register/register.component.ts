import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends TranslatableComponent implements OnInit, CanComponentDeactivate {

  registrationForm: FormGroup;
  map: Map;
  markerLayer: VectorLayer;
  updated: boolean;

  constructor(private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private translateService: TranslateService) {
    super(translateService);
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
    var coordinates = this.map.getEventCoordinate(event);
    var iconFeature = new Feature({
      geometry: new Point(coordinates),
    });
    
    var iconStyle = new Style({
      image: new Icon({
        src: 'src/favicon.ico'
      })
    });
    
    iconFeature.setStyle(iconStyle);

    var vectorSource = new VectorSource({
      features: [iconFeature]
    });
    var vectorLayer = new VectorLayer({
        source: vectorSource
    });
    if (this.markerLayer) {
      this.map.removeLayer(this.markerLayer)
    }
    this.markerLayer = vectorLayer;
    this.map.addLayer(vectorLayer);
    this.registrationForm.get('address').setValue(coordinates)
  }

  createForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      role: ['EXPLORER'],
      banned: [false]
    });
  }

  onRegister() {
    var actor = this.registrationForm.value;
    delete actor['repeatPassword'];
    this.authService.registerUser(actor)
    .then(res => {
      console.log(res);
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    const message = this.translateService.instant('messages.discard.changes');
    if (!this.updated && this.registrationForm.dirty) {
      result = confirm(message);
    }
    return result;
  }

}
