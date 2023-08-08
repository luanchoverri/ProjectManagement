import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsFooterComponent } from './user-settings-footer.component';

describe('UserSettingsFooterComponent', () => {
  let component: UserSettingsFooterComponent;
  let fixture: ComponentFixture<UserSettingsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSettingsFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSettingsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
