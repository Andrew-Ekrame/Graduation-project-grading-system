import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDrAccComponent } from './create-dr-acc.component';

describe('CreateDrAccComponent', () => {
  let component: CreateDrAccComponent;
  let fixture: ComponentFixture<CreateDrAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDrAccComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDrAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
