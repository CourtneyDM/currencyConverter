import { Component } from '@angular/core';
import { Rate } from '../models/rates.models';
import { Converted } from '../models/converted.models';

@Component( {
  selector: 'app-currency',
  templateUrl: './currency.component.html'
} )

export class CurrencyComponent {

  amountFrom: number;
  amountTo: number;
  amount: number;
  baseCurrency: string;
  convertFrom: string;
  convertTo: string;
  conversion: Converted;
  converted: any[];
  currencies: any[];
  currencyRate: Rate;
  url: string;

  constructor () {
    this.baseCurrency = '';
    this.convertFrom = 'USD';
    this.convertTo = 'GBP';
    this.url = 'https://api.exchangeratesapi.io/latest?';

    // Set default values for amounts & currency
    this.amountFrom = 1;
    this.amountTo = 1;
    this.currencies = [];

    // Get the currency symbols and rates
    fetch( this.url + this.convertTo )
      .then( response => response.json() )
      .then( data => {
        // Convert the data object into array
        const symbols = Object.entries( ( data.rates ) );
        symbols.map( symbol => {

          // Set the currency symbols and their rates
          this.currencyRate = { currencySymbol: symbol[ 0 ], currencyRate: symbol[ 1 ] };
          this.currencies.push( this.currencyRate );
        } );
      } );


  }

  // Get the values from the user input
  getUserInput ( event, amount ) {
    if ( event.target.name === 'convertFrom' ) {
      this.baseCurrency = event.target.value;
      this.amountFrom = amount;
      this.getCurrencyConversion( this.baseCurrency, this.convertTo );
    }
    if ( event.target.name === 'convertTo' ) {
      this.baseCurrency = event.target.value;
      this.amountTo = amount;
      this.getCurrencyConversion( this.baseCurrency, this.convertFrom );
    }

    console.log( this.converted );
  }


  // Get the conversion rate
  getCurrencyConversion ( fromSymbol, toSymbol ) {
    this.converted = [];
    fetch( this.url + `base=${ fromSymbol }` + `&symbols=${ fromSymbol },${ toSymbol }` )
      .then( response => response.json() )
      .then( data => {
        const entries = Object.entries( ( data.rates ) );
        this.conversion = {
          firstSymbol: entries[ 0 ][ 0 ],
          firstSymbolRate: entries[ 0 ][ 1 ],
          secondSymbol: entries[ 1 ][ 0 ],
          secondSymbolRate: entries[ 1 ][ 1 ]
        };
        return this.converted.push( this.conversion );
      } );
  }

  // TODO: Create functionality to draw graph using Cytoscape.js
}
