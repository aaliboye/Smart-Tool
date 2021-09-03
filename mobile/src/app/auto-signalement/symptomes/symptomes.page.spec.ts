import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymptomesPage } from './symptomes.page';

describe('SymptomesPage', () => {
  let component: SymptomesPage;
  let fixture: ComponentFixture<SymptomesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymptomesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
