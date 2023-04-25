import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDevoirComponent } from './manage-devoir.component';

describe('ManageDevoirComponent', () => {
  let component: ManageDevoirComponent;
  let fixture: ComponentFixture<ManageDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDevoirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
