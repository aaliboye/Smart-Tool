import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HabitudesAntecedentsPage } from './habitudes-antecedents.page';

describe('HabitudesAntecedentsPage', () => {
  let component: HabitudesAntecedentsPage;
  let fixture: ComponentFixture<HabitudesAntecedentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitudesAntecedentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitudesAntecedentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
