import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Symbols } from './services/api.interface';
import { Observable, of, defer, throwError } from 'rxjs';
import { getSymbols } from './store/store.actions';
import { delay } from 'rxjs/operators';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore<any>;
  let mockSymbols$: Observable<Symbols | null>;

  const mockSymbols: Symbols = {
    symbols: {
      USD: 'United States Dollar',
      EUR: 'Euro',
      GBP: 'British Pound'
    },
    success: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        provideMockStore({
          initialState: {
            store: {
              symbols: null
            }
          }
        }),
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            select: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<any>;

    mockSymbols$ = of(mockSymbols).pipe(delay(100));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch getSymbols action on initialization', () => {
    jest.spyOn(store, 'select').mockReturnValue(mockSymbols$);
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(getSymbols());
  });

  it('should render the nav bar and router outlet', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const navBarElement = compiled.querySelector('app-nav-bar');
    const routerOutletElement = compiled.querySelector('router-outlet');

    expect(navBarElement).toBeDefined();
    expect(routerOutletElement).toBeDefined();
  });

  it('should display error container when symbols data retrieval fails', () => {
    const error = new Error('Failed to retrieve symbols');
    mockSymbols$ = defer(() => throwError(error));

    jest.spyOn(store, 'select').mockReturnValue(mockSymbols$);
    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const errorContainerElement = fixture.nativeElement.querySelector('.error-container');
      expect(errorContainerElement).not.toBeNull();
      expect(errorContainerElement.textContent).toContain('Failed to retrieve symbols');
    });
  });
});