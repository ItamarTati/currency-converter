import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initially set isSmallScreen to false', () => {
    expect(component.isSmallScreen).toBeFalsy();
  });

  it('should initially set isMenuOpen to false', () => {
    expect(component.isMenuOpen).toBeFalsy();
  });

  it('should set isSmallScreen to true when the screen size is smaller than 950 pixels', () => {
    (window as any).innerWidth = 800;
    window.dispatchEvent(new Event('resize'));
    expect(component.isSmallScreen).toBeTruthy();
  });

  it('should set isSmallScreen to false when the screen size is larger than or equal to 950 pixels', () => {
    (window as any).innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
    expect(component.isSmallScreen).toBeFalsy();
  });

  it('should toggle the menu state when toggleMenu is called', () => {
    expect(component.isMenuOpen).toBeFalsy();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTruthy();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalsy();
  });
});