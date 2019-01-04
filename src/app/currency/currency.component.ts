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
  updateAmountFrom ( event ) {
    this.amountFrom = event.target.value;
    console.log( `Convert ${ this.amountFrom } ${ this.convertFrom }, to ${ this.amountTo }: ${ this.convertTo }. ` );
    this.getConversionRate();
  }

  updateAmountTo ( event ) {
    this.amountTo = event.target.value;
    console.log( `Convert ${ this.amountFrom } ${ this.convertFrom }, to ${ this.amountTo }: ${ this.convertTo }. ` );
    this.getConversionRate();
  }

  // TODO: Create a function that will convert the currency from a defined base to a specified base.
  // 1. run this function if the amount from field changes - update the amount to input field
  // 2. run this function if the amount to field changes - update the amount from input field
  // 3. run this function if the dropdown field changes.
  // }

  getConversionRate () {
    const oldCurrency = this.convertFrom;
    const newCurrency = this.convertTo;
    console.log( newCurrency );
    // Need a base symbol - the symbol to convert from
    // Need the converted symbol - the symbol to convert to

    fetch( `https://api.exchangeratesapi.io/latest?symbols=${ oldCurrency },${ newCurrency }&base=${ oldCurrency }` )
      .then( response => response.json().then( data => console.log( data.rates.newCurrency ) ) );
  }
}
