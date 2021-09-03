import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoMapPage } from './histo-map.page';

describe('HistoMapPage', () => {
  let component: HistoMapPage;
  let fixture: ComponentFixture<HistoMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
