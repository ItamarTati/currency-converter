import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Symbols } from './services/api.interface';
import { Observable } from 'rxjs';
import { getSymbols } from './store/store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  symbols$!: Observable<Symbols>;

  constructor(
    private readonly store: Store<{ store: { symbols: Symbols } }>,
  ) { }
  ngOnInit(): void {
    this.store.dispatch(getSymbols())
    this.symbols$ = this.store.select(state => state.store.symbols)
  }
}