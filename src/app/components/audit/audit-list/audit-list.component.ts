import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Audit } from 'src/app/models/audit.model';
import { AuditService } from 'src/app/services/audit.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.css']
})
export class AuditListComponent extends TranslatableComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  private audits: Audit[];

  constructor(private auditService: AuditService,
    private translateService: TranslateService,
    private route: ActivatedRoute) {
      super(translateService);
  }

  getAuditorAudits() {
    return this.auditService.getAuditorAudits('5e78bd7713b68995265511f8');
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getAuditorAudits()
      .then((response) => {
        this.audits = <Audit[]>response;
        this.dtTrigger.next();
      }).catch(error => {
        console.error(error);
      });
  }

}
