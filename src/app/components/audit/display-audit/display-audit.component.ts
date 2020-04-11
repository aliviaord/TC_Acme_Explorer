import { Component, OnInit } from '@angular/core';
import { Audit } from 'src/app/models/audit.model';
import { AuditService } from 'src/app/services/audit.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { Actor } from 'src/app/models/actor.model';
import { TripService } from 'src/app/services/trip.service';
import { ActorService } from 'src/app/services/actor.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-display-audit',
  templateUrl: './display-audit.component.html',
  styleUrls: ['./display-audit.component.css']
})
export class DisplayAuditComponent extends TranslatableComponent implements OnInit {

  id: string;
  audit = new Audit();
  trip = new Trip();
  auditor = new Actor();

  constructor(private auditService: AuditService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private tripService: TripService,
    private actorService: ActorService) {
    super(translateService);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.auditService.getAudit(this.id)
      .then((audit) => {
        this.audit = audit;
        this.tripService.getTrip(audit.trip)
          .then((trip) => {
            this.trip = trip;
            this.actorService.getActor(audit.auditor)
            .then((auditor) => {
              this.auditor = auditor;
            }).catch((err) => {
              console.error(err);
            });
          }).catch((err) => {
            console.error(err);
          });
      }).catch((err) => {
        console.error(err);
      });
  }
}
