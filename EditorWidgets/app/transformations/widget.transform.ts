/**
 * Created by Natallia on 6/9/2016.
 */
import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({
  name: 'filterBy'
})
@Injectable()
export class FilterBy implements PipeTransform {
  transform(items: any[], args: any[]): any {
    return items.filter(item => item.id.indexOf(args[0]) !== -1);
  }
}

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {

  transform(item: any, orderField: string): any {
      var orderType = 'ask';
      let currentField = orderField;
      if (currentField[0] === '-') {
        currentField = currentField.substring(1);
        orderType = 'desc';
      }

      item.sort((a: any, b: any) => {
        if (orderType === 'desc') {
          if (a[currentField] > b[currentField]) return -1;
          if (a[currentField] < b[currentField]) return 1;
          return 0;
        } else {
          if (a[currentField] > b[currentField]) return 1;
          if (a[currentField] < b[currentField]) return -1;
          return 0;
        }
      });
    return item;
  }
}
