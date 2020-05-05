import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderDisplayComponent } from './finder-display.component';

describe('FinderDisplayComponent', () => {
  let component: FinderDisplayComponent;
  let fixture: ComponentFixture<FinderDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinderDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
