import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActorService } from '../../../services/actor.service';
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
import { InfoMessageService } from '../../../services/info-message.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent extends TranslatableComponent implements OnInit {

  editForm: FormGroup;
  roleList: string[];
  map: Map;
  markerLayer: VectorLayer;
  actor;

  constructor(private router: Router,
    private authService: AuthService,
    private actorService: ActorService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private infoMessageService: InfoMessageService,
    private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
    var id = this.authService.getCurrentActor().id;
    this.actorService.getActor(id)
      .then((actor) => {
        this.actor = actor;
        this.createEditForm(actor);
      }).catch((err) => {
        console.error(err);
      });
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

  createEditForm(actor) {
    this.editForm = this.fb.group({
      name: [actor.name, Validators.required],
      surname: [actor.surname, Validators.required],
      address: [actor.address, Validators.required],
      phoneNumber: [actor.phoneNumber, [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
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
    this.editForm.get('address').setValue(coordinates)
  }

  onEdit() {
    var actor = this.editForm.value;
    actor.id = this.actor.id;
    actor.password = this.actor.password;
    actor.email = this.actor.email;
    actor.role = this.actor.role;
    actor.banned = this.actor.banned;
    actor.version = this.actor.version;
    this.actorService.editActor(actor)
    .then(res => {
      console.log(res);
      this.infoMessageService.notifyMessage('messages.profile.edit.correct',
              'text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative');
      this.router.navigate(['/edit-profile']);
    }, err => {
      console.log(err);
      this.infoMessageService.notifyMessage('messages.profile.edit.failed',
              'text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative');
    });
  }


}
