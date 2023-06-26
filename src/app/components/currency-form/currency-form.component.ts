import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Symbols } from 'src/app/services/api.interface';


@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent {
  @Input() public form!: FormGroup;
  @Output() formSubmit: EventEmitter<{ date: Date, symbols: string[] }> = new EventEmitter<{ date: Date, symbols: string[] }>();

  public selectSymbols: { value: string, display: string }[] = [];
  public symbols$!: Observable<Symbols | null>;

  constructor(
    private readonly store: Store<{ store: { symbols: Symbols } }>
  ) { }

  ngOnInit(): void {
    this.symbols$ = this.store.select(state => state.store.symbols);
    this.symbols$.subscribe((symbols) => {
      if (symbols && symbols.symbols) {
        this.populateSymbolOptions(symbols);
      }
    });
  }

  private populateSymbolOptions(symbols: Symbols): void {
    this.selectSymbols = Object.keys(symbols.symbols).map(key => ({
      value: key,
      display: symbols.symbols[key]
    }));
  }
  public submitForm(): void {
    if (this.form.valid) {
      const selectedValues: string[] = [];
      const selectedDate: Date = this.form.get('selectedDate')?.value;

      if (this.form.get('selectedSymbols')) {
        selectedValues.push(...this.form.get('selectedSymbols')?.value);
      }

      if (!this.form.get('selectedDate') || selectedDate <= new Date()) {
        this.formSubmit.emit({ date: selectedDate, symbols: selectedValues });
      }
    }
  }

  public isSymbolSelected(symbol: string): boolean {
    const selectedSymbols = this.form.get('selectedSymbols')?.value;
    return selectedSymbols && selectedSymbols.includes(symbol);
  }
}