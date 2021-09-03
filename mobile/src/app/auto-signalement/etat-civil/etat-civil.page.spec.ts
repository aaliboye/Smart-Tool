import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtatCivilPage } from './etat-civil.page';

describe('EtatCivilPage', () => {
  let component: EtatCivilPage;
  let fixture: ComponentFixture<EtatCivilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatCivilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtatCivilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
