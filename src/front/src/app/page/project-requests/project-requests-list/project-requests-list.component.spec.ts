import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequestsListComponent } from './project-requests-list.component';

describe('ProjectRequestsListComponent', () => {
  let component: ProjectRequestsListComponent;
  let fixture: ComponentFixture<ProjectRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRequestsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
