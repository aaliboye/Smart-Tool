import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JardinPage } from './jardin.page';

describe('JardinPage', () => {
  let component: JardinPage;
  let fixture: ComponentFixture<JardinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JardinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JardinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
