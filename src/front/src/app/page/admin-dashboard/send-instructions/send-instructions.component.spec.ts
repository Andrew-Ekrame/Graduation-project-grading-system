import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInstructionsComponent } from './send-instructions.component';

describe('SendInstructionsComponent', () => {
  let component: SendInstructionsComponent;
  let fixture: ComponentFixture<SendInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
