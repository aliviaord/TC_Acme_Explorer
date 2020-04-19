import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Audit } from 'src/app/models/audit.model';
import { AuditService } from 'src/app/services/audit.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

const MAX_AUDITS = 6;
@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.css']
})
export class AuditListComponent extends TranslatableComponent implements OnInit {
  
  public audits: Audit[];

  constructor(private auditService: AuditService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private authService: AuthService) {
      super(translateService);
  }

  getAuditorAudits(start, psize) {
    var auditorId = this.authService.getCurrentActor().id;
    return this.auditService.getAuditorAuditsPage(start, psize, auditorId);
  }

  ngOnInit() {
    this.getAuditorAudits(0, MAX_AUDITS)
      .then((response) => {
        this.audits = <Audit[]>response;
      }).catch(error => {
        console.error(error);
      });
  }

  onScrollDown(ev) {
    const startIndex = this.audits.length;
    this.getAuditorAudits(startIndex, MAX_AUDITS)
    .then(val => { this.audits = this.audits.concat(val); })
    .catch(err => { console.log(err); });
    }

}
