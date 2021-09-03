import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoSignalementPage } from './auto-signalement.page';

describe('AutoSignalementPage', () => {
  let component: AutoSignalementPage;
  let fixture: ComponentFixture<AutoSignalementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSignalementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoSignalementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
