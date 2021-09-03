import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidationPhonePage } from './validation-phone.page';

describe('ValidationPhonePage', () => {
  let component: ValidationPhonePage;
  let fixture: ComponentFixture<ValidationPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationPhonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
