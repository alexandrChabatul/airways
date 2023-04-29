import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetworkSignupComponent } from './social-network-signup.component';

describe('SocialNetworkSignupComponent', () => {
  let component: SocialNetworkSignupComponent;
  let fixture: ComponentFixture<SocialNetworkSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialNetworkSignupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialNetworkSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
