import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestHistoPage } from './gest-histo.page';

describe('GestHistoPage', () => {
  let component: GestHistoPage;
  let fixture: ComponentFixture<GestHistoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestHistoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestHistoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
