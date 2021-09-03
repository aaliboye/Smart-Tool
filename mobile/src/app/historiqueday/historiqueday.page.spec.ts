import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoriquedayPage } from './historiqueday.page';

describe('HistoriquedayPage', () => {
  let component: HistoriquedayPage;
  let fixture: ComponentFixture<HistoriquedayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriquedayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriquedayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
