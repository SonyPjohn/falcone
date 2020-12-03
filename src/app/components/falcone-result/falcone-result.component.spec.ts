import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalconeResultComponent } from './falcone-result.component';

describe('FalconeResultComponent', () => {
  let component: FalconeResultComponent;
  let fixture: ComponentFixture<FalconeResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalconeResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalconeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
