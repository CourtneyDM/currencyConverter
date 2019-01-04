import { Component } from '@angular/core';

@Component( {
  selector: 'app-currency',
  templateUrl: './currency.component.html'
} )

export class CurrencyComponent {
  // Holds the convert from currency value.
  convertFrom: string;

  // Holds the convert to currency value.
  convertTo: string;

  // Will be the dollar amount to convert from.
  amountFrom: number;

  // Will be the dollar amount to convert to.
  amountTo: number;

  // Will reference the amount
  amount: number;
  url: string;

  currencies: string[];

  constructor () {
    // Get currency symbols based on data from https://exchangeratesapi.io
    this.url = 'https://api.exchangeratesapi.io/latest?symbols';
    this.currencies = [ 'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR',
      'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR' ];

    // Set default values for amounts & currency
    this.amountFrom = 1;
    this.amountTo = 1;
    this.convertFrom = 'USD';
    this.convertTo = 'GBP';

  }

  // Listen to input events and update the amount
  // TODO: Use Observables to minimize repeated code - RxJS vs NgRx
  updateAmountFrom ( event ) {
    this.amountFrom = event.target.value;
    console.log( `Convert ${ this.amountFrom } ${ this.convertFrom }, to ${ this.amountTo }: ${ this.convertTo }. ` );
    this.getConversionRate();
  }

  // TODO: Implement DRY code - this function performs the same tasks as the function above.
  updateAmountTo ( event ) {
    this.amountTo = event.target.value;
    console.log( `Convert ${ this.amountFrom } ${ this.convertFrom }, to ${ this.amountTo }: ${ this.convertTo }. ` );
    this.getConversionRate();
  }

  getConversionRate () {
    // This function fetches the data from the API and returns the conversion rate for the specified currencies.
    // TODO: Update the amount by calculating the conversion rate and the amount inputed by the user

    const oldCurrency = this.convertFrom;
    const newCurrency = this.convertTo;
    console.log( newCurrency );
    // Need a base symbol - the symbol to convert from
    // Need the converted symbol - the symbol to convert to

    fetch( `https://api.exchangeratesapi.io/latest?symbols=${ oldCurrency },${ newCurrency }&base=${ oldCurrency }` )
      .then( response => response.json().then( data => console.log( data.rates.newCurrency ) ) );
  }

  // TODO: Create functionality to draw graph using Cytoscape.js
}
