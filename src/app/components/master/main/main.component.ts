import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends TranslatableComponent implements OnInit {

  constructor(private router: Router, private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
  }

}
