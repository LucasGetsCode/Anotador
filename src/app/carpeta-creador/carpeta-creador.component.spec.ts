import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetaCreadorComponent } from './carpeta-creador.component';

describe('CarpetaCreadorComponent', () => {
  let component: CarpetaCreadorComponent;
  let fixture: ComponentFixture<CarpetaCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarpetaCreadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarpetaCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
