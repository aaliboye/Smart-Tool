import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommuniquePage } from './communique.page';

describe('CommuniquePage', () => {
  let component: CommuniquePage;
  let fixture: ComponentFixture<CommuniquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommuniquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommuniquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
