import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarrierGesturePage } from './barrier-gesture.page';

describe('BarrierGesturePage', () => {
  let component: BarrierGesturePage;
  let fixture: ComponentFixture<BarrierGesturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrierGesturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarrierGesturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
