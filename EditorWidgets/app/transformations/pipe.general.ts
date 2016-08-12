/**
 * Created by Natallia on 6/9/2016.
 */
import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({
  name: 'hideClass'
})
export class HideClass implements PipeTransform {
  transform(items: any[], classNames: string[]): any {
    if (!items) return items;
    return items.filter(x => (classNames.indexOf(x.class) < 0));
  }
}

@Pipe({
  name: 'filterBy'
})
export class FilterBy implements PipeTransform {
  transform(items: any[], args: any[]): any {
    if (!items) return items;
    if (!args || args.length < 2) return items;
    if (args[0].length == 0) return items;
    let filter = args[0];
    let property = args[1];
    return items.filter(item =>
      (typeof(item[property]) === 'string')?
      item[property].toLowerCase().indexOf(filter.toLowerCase()) !== -1 :
      item[property] == filter);
  }
}

@Pipe({
  name: 'filterByClass'
})
export class FilterByClass implements PipeTransform {
  transform(items: any[], classNames: any[]): any {
    if (!items) return items;
    return items.filter(item => (classNames.indexOf(item.class) !== -1));
  }
}

@Pipe({
  name: 'mapToOptions'
})
export class MapToOptions implements PipeTransform {
  transform(items: any[]): any {
    if (!items || !items[0]) return [];
    if (items[0].children){
      //grouped
      for (let i = 0; i < items.length; i++){
        items[i].children = convert(items[i].children);
      }
      return items;
    }
    else
      return convert(items);

    function convert(items: any[]){
      return items.map((entry: any) => ({
        id: (entry.id)? entry.id: (entry.name)? entry.name: entry.text,
        text: entry.name? entry.name: (entry.text)? entry.text: entry.id}))
    }
  }
}

@Pipe({
  name: 'setToArray'
})
export class SetToArray implements PipeTransform {
  transform(items: Set<any>): Array<any> {
    return Array.from(items || []);
  }
}

@Pipe({
  name: 'mapToCategories'
})
export class MapToCategories implements PipeTransform {
  transform(items: any[]): any {
    if (!items || (items.length == 0)) return [];
    let types = Array.from(new Set(items.map(item => item.type)));
    let typedItems: any[] = [];
    for (let type of types){
      let typed = items.filter(item => (item.type == type));
      typedItems.push({text: type, children: typed});
    }
    return typedItems;
  }
}

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {

  transform(items: any[], property: string): any {
    var orderType = 'asc';
    let currentField = property;
    if (currentField.indexOf("unsorted") > -1) return items;
    if (currentField[0] === '-') {
      currentField = currentField.substring(1);
      orderType = 'desc';
    }

    items.sort((a: any, b: any) => {
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
    return items;

  }
}
