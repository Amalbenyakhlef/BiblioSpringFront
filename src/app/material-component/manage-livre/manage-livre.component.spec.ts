import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLivreComponent } from './manage-livre.component';

describe('ManageLivreComponent', () => {
  let component: ManageLivreComponent;
  let fixture: ComponentFixture<ManageLivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLivreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
