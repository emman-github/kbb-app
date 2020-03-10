import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillQtyReportsPage } from './bill-qty-reports.page';

describe('BillQtyReportsPage', () => {
  let component: BillQtyReportsPage;
  let fixture: ComponentFixture<BillQtyReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillQtyReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillQtyReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
