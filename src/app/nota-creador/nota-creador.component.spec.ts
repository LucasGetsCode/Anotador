import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCreadorComponent } from './nota-creador.component';

describe('NotaCreadorComponent', () => {
  let component: NotaCreadorComponent;
  let fixture: ComponentFixture<NotaCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotaCreadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotaCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
