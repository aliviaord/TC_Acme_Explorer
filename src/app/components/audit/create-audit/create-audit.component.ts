import { Component, OnInit } from '@angular/core';
import { Audit } from 'src/app/models/audit.model';
import { Trip } from 'src/app/models/trip.model';
import { AuditService } from 'src/app/services/audit.service';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import Spanish from 'flatpickr/dist/l10n/es.js';
import English from 'flatpickr/dist/l10n/uk.js';
import { auth } from 'firebase';

@Component({
  selector: 'app-create-audit',
  templateUrl: './create-audit.component.html',
  styleUrls: ['./create-audit.component.css']
})
export class CreateAuditComponent extends TranslatableComponent implements OnInit {
  
  auditForm: FormGroup;
  flatpickrOptions: FlatpickrOptions = {
    locale: this.getLang() == 'es' ? Spanish.es : English.en,
    dateFormat: 'd/m/Y'
  };
  trips: Trip[];

  constructor(private auditService: AuditService,
    private tripService: TripService,
    private translateService: TranslateService,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
      super(translateService);
      this.createForm();
  }

  getLang() {
    if (localStorage.getItem('language') !== null) {
      return localStorage.getItem('language');
    }
    return this.translateService.getBrowserLang();
  }

  createForm() {
    this.auditForm = this.fb.group({
      title: [''],
      description: [''],
      trip: [''],
      auditor: [''],
    });
  }

  onCreateAudit() {
    let audit = this.auditForm.value;
    audit.auditor = this.authService.getCurrentActor().id;
    audit.createdAt = new Date();
    this.auditService.createAudit(audit)
    .then(res => {
      console.log(res); 
      this.router.navigate(['/my-audits']);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.tripService.getTrips()
    .then(trips => {
      this.trips = trips;
    }, err => {
      console.log(err);
    });
  }
}
