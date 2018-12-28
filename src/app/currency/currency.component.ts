import { Component } from '@angular/core';
import { Rates } from '../models/rates.models';

@Component( {
  selector: 'app-currency',
  templateUrl: './currency.component.html'
} )

export class CurrencyComponent {
  rates: Rates[];
  selected: string;

  constructor () {
    this.rates = [
      { name: 'HRK', rate: 7.4125 }, { name: 'HUF', rate: 321.56 }, { name: 'IDR', rate: 16608.2 }, { name: 'PHP', rate: 59.991 },
      { name: 'TRY', rate: 6.0067 }, { name: 'RON', rate: 4.6536 }, { name: 'ISK', rate: 133 }, { name: 'SEK', rate: 10.2725 },
      { name: 'THB', rate: 37.026 }, { name: 'PLN', rate: 4.2945 }, { name: 'GBP', rate: 0.90073 }, { name: 'CAD', rate: 1.55 },
      { name: 'AUD', rate: 1.6161 }, { name: 'MYR', rate: 4.7419 }, { name: 'NZD', rate: 1.6964 }, { name: 'CHF', rate: 1.1279 },
      { name: 'DKK', rate: 7.4672 }, { name: 'SGD', rate: 1.5617 }, { name: 'CNY', rate: 7.8109 }, { name: 'BGN', rate: 1.9558 },
      { name: 'CZK', rate: 25.858 }, { name: 'BRL', rate: 4.4786 }, { name: 'JPY', rate: 126.14 }, { name: 'KRW', rate: 1276.84 },
      { name: 'INR', rate: 79.9445 }, { name: 'MXN', rate: 22.6283 }, { name: 'RUB', rate: 78.8767 }, { name: 'HKD', rate: 8.9109 },
      { name: 'USD', rate: 1.1377 }, { name: 'ZAR', rate: 16.5208 }, { name: 'ILS', rate: 4.3027 }, { name: 'NOK', rate: 9.9698 } ];

    this.selected = 'USD';
  }


}
