
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianCurrency',
})
export class IndianCurrencyPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    if (value !== null && !isNaN(value)) {
      let output = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
      }).format(value);

      return output;
    }
  }
}
