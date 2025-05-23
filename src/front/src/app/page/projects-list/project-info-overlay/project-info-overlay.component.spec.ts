import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoOverlayComponent } from './project-info-overlay.component';

describe('ProjectInfoOverlayComponent', () => {
  let component: ProjectInfoOverlayComponent;
  let fixture: ComponentFixture<ProjectInfoOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectInfoOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectInfoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
