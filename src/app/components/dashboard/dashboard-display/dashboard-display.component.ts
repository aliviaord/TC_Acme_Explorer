import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Dashboard } from 'src/app/models/dashboard.model';

@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.css']
})
export class DashboardDisplayComponent extends TranslatableComponent implements OnInit {

  dashboard = new Dashboard();

  constructor(private translateService: TranslateService,
    private dashboardService: DashboardService) {
    super(translateService);
  }

  ngOnInit() {
    this.dashboardService.getDashboards()
      .then((val) => {
        this.dashboard = val[0];
      }).catch((err) => {
        console.error(err);
      });
  }

}
