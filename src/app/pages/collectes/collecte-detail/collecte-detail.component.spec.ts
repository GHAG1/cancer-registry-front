import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollecteDetailComponent } from './collecte-detail.component';

describe('CollecteDetailComponent', () => {
  let component: CollecteDetailComponent;
  let fixture: ComponentFixture<CollecteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollecteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollecteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
