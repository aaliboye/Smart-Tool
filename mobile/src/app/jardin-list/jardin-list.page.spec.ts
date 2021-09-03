import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JardinListPage } from './jardin-list.page';

describe('PreventionPage', () => {
  let component: JardinListPage;
  let fixture: ComponentFixture<JardinListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JardinListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JardinListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
