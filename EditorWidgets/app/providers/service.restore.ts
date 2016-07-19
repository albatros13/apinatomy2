/**
 * Created by Natallia on 6/15/2016.
 */
import {Injectable, Inject} from '@angular/core';

@Injectable()
export class RestoreService {
  originalItem: any;
  currentItem: any;

  setItem (item: any) {
    this.originalItem = item;
    this.currentItem = this.clone(item);
  }

  getItem (): any {
    return this.currentItem;
  }

  restoreItem (): any {
    this.currentItem = this.originalItem;
    return this.getItem();
  }

  clone(obj: any) {
    if (!obj) return obj;
    if (obj instanceof Array) {
      let out: any[] = [];
      for (let i = 0; i < obj.length; i++)
        out[i] = this.clone(obj[i]);
      return out;
    } else
      if (typeof obj === 'object') {
        let out = {};
        for (let i in obj)
          out[i] = this.clone(obj[i]);
        return out;
      }
    return obj;
    //return Object.assign({}, obj);
  }
}
