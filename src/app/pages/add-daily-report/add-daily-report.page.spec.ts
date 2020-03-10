import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDailyReportPage } from './add-daily-report.page';

describe('AddDailyReportPage', () => {
  let component: AddDailyReportPage;
  let fixture: ComponentFixture<AddDailyReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDailyReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDailyReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
