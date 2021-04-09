import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeRendererComponent } from './three-renderer.component';

describe('ThreeRendererComponent', () => {
  let component: ThreeRendererComponent;
  let fixture: ComponentFixture<ThreeRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
