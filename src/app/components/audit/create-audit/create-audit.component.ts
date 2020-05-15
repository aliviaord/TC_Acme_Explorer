import { Component, OnInit } from '@angular/core';
import { Audit } from 'src/app/models/audit.model';
import { Trip } from 'src/app/models/trip.model';
import { AuditService } from 'src/app/services/audit.service';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-create-audit',
  templateUrl: './create-audit.component.html',
  styleUrls: ['./create-audit.component.css']
})
export class CreateAuditComponent extends TranslatableComponent implements OnInit, CanComponentDeactivate {
  
  auditForm: FormGroup;
  trips: Trip[];
  updated: boolean;

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
      title: ['', Validators.required],
      description: ['', Validators.required],
      trip: ['', Validators.required],
      auditor: [''],
      attachments: [''],
    });
  }

  onCreateAudit() {
    let audit = this.auditForm.value;
    audit.auditor = this.authService.getCurrentActor().id;
    audit.createdAt = new Date();
    audit.attachments = audit.attachments.split("\n")
    this.auditService.createAudit(audit)
    .then(res => {
      console.log(res); 
      this.router.navigate(['/audits']);
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

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    const message = this.translateService.instant('messages.discard.changes');
    if (!this.updated && this.auditForm.dirty) {
      result = confirm(message);
    }
    return result;
  }
}
