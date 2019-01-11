import { Component } from '@angular/core';
import { Rate } from '../models/rates.models';

@Component( {
  selector: 'app-currency',
  templateUrl: './currency.component.html'
} )

export class CurrencyComponent {

  convertFrom: string;
  convertTo: string;
  amountFrom: number;
  amountTo: number;
  amount: number;
  url: string;
  currencyRate: Rate;
  currencies: any[];

  constructor () {
    this.url = 'https://api.exchangeratesapi.io/latest?base=USD';

    // Set default values for amounts & currency
    this.amountFrom = 1;
    this.amountTo = 1;
    this.currencies = [];

    // Get the currency symbols and rates
    fetch( 'https://api.exchangeratesapi.io/latest?base=USD' )
      .then( response => response.json() )
      .then( data => {
        // Convert the data object into array
        const currencies = Object.entries( ( data.rates ) );
        currencies.map( currency => {
          // Set the currency symbols and their rates
          this.currencyRate = { currencySymbol: currency[ 0 ], currencyRate: currency[ 1 ] };
          this.currencies.push( this.currencyRate );
          // console.log( this.currencyRate );
        } );
      } );
    console.log( this.currencies );
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
