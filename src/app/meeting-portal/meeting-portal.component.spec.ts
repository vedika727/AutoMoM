import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPortalComponent } from './meeting-portal.component';

describe('MeetingPortalComponent', () => {
  let component: MeetingPortalComponent;
  let fixture: ComponentFixture<MeetingPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
