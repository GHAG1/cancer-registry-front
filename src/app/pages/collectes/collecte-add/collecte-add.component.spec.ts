import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollecteAddComponent } from './collecte-add.component';

describe('CollecteAddComponent', () => {
  let component: CollecteAddComponent;
  let fixture: ComponentFixture<CollecteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollecteAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollecteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
