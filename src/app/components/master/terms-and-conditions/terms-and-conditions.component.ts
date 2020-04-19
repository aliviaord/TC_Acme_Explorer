import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-terms-and-conditions',
  template: `<div [innerHtml]='myTemplate'></div>`,
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  private myTemplate: any = '';
  private htmlFile = 'assets/terms-and-conditions/terms-and-conditions_'
    + this.translateService.currentLang + '.html';

  constructor(private translateService: TranslateService,
    private http: HttpClient, private sanitizer: DomSanitizer) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.htmlFile = 'assets/terms-and-conditions/terms-and-conditions_'
        + event.lang + '.html';
      this.http.get(this.htmlFile, {responseType: 'text'}).subscribe((html) => {
        this.myTemplate = sanitizer.bypassSecurityTrustHtml(html);
      });
    });
  }

  ngOnInit() {
    this.http.get(this.htmlFile, {responseType: 'text'}).subscribe((html) => {
      this.myTemplate = this.sanitizer.bypassSecurityTrustHtml(html);
    });
  }

}
