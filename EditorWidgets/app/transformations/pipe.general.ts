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

@Pipe({
  name: 'filterByClass'
})
@Injectable()
export class FilterByClass implements PipeTransform {
  transform(items: any[], classNames: any[]): any {
    return items.filter(item => (classNames.indexOf(item.class) !== -1));
  }
}

@Pipe({
  name: 'mapToOptions'
})
@Injectable()
export class MapToOptions implements PipeTransform {
  transform(items: any[]): any {
    if (!items) return [];
    return items.map((entry: any) => ({id: entry.id + "-" + entry.name, text: entry.name? entry.name: entry.id}))
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
