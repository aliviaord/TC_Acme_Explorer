import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Actor } from 'src/app/models/actor.model';
import { Finder } from 'src/app/models/finder.model';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FinderService } from 'src/app/services/finder.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoMessageService } from 'src/app/services/info-message.service';
import * as moment from 'moment';

@Component({
  selector: 'app-finder-edit',
  templateUrl: './finder-edit.component.html',
  styleUrls: ['./finder-edit.component.css']
})
export class FinderEditComponent extends TranslatableComponent implements OnInit {

  currentActor: Actor;
  editForm: FormGroup;
  finder;
  locale = {
    format: this.getLang() === 'es' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'
  };
  dates = {
    startDate: moment(),
    endDate: moment().add(1, 'years')
  };
  moment: any = moment;

  constructor(private translateService: TranslateService,
    private finderService: FinderService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private infoMessageService: InfoMessageService) {
      super(translateService);
      this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        this.locale = {
          format: event.lang === 'es' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'
        };
      });
  }

  ngOnInit() {
    this.currentActor = this.authService.getCurrentActor();
    this.finderService.getFinder(this.currentActor.id)
      .then((val) => {
        this.finder = val[0];
        this.dates.startDate = (this.finder.startDate == null) ? moment() : moment(this.finder.startDate);
        this.dates.endDate = (this.finder.endDate == null) ? moment().add(1, 'years') : moment(this.finder.endDate);
        this.createEditForm(this.finder);
      }).catch((err) => {
        console.error(err);
      });
  }

  createEditForm(finder) {
    this.editForm = this.fb.group({
      keyword: finder.keyword,
      minPrice: finder.minPrice,
      maxPrice: finder.maxPrice,
      dates: [{
        startDate: this.dates.startDate,
        endDate: this.dates.endDate
      }]
    });
  }

  onEdit() {
    const finder = new Finder();
    finder.keyword = this.editForm.value.keyword;
    finder.minPrice = this.editForm.value.minPrice;
    finder.maxPrice = this.editForm.value.maxPrice;
    finder.startDate = this.editForm.value.dates.startDate;
    finder.endDate = this.editForm.value.dates.endDate;
    finder.id = this.finder.id;
    finder.explorer = this.finder.explorer;

    this.finderService.editFinder(finder)
      .then(res => {
        this.infoMessageService.notifyMessage('messages.finder.edit.correct',
              'text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative');
        this.router.navigate(['/finder']);
      }, err => {
        alert(err.message);
        this.infoMessageService.notifyMessage('messages.finder.edit.failed',
              'text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative');
      });
  }

  getLang() {
    if (localStorage.getItem('language') !== null) {
      return localStorage.getItem('language');
    }
    return this.translateService.getBrowserLang();
  }
}
