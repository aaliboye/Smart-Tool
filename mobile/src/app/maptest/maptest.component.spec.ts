import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaptestComponent } from './maptest.component';

describe('MaptestComponent', () => {
  let component: MaptestComponent;
  let fixture: ComponentFixture<MaptestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaptestComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
