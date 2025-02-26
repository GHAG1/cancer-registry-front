import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollecteListeComponent } from './collecte-liste.component';

describe('CollecteListeComponent', () => {
  let component: CollecteListeComponent;
  let fixture: ComponentFixture<CollecteListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollecteListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollecteListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
