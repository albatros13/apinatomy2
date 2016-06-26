/**
 * Created by Natallia on 6/15/2016.
 */

export class EditItem<T> {
  editing: boolean;
  constructor (public item: T) {}
}

export class RestoreService<T> {
  originalItem: T;
  currentItem: T;

  setItem (item: T) {
    this.originalItem = item;
    this.currentItem = this.clone(item);
  }

  getItem (): T {
    return this.currentItem;
  }

  restoreItem (): T {
    this.currentItem = this.originalItem;
    return this.getItem();
  }

  clone(obj: T) :T {
    //let objCopy = (JSON.parse(JSON.stringify(obj)));
    let objCopy = <T>{};
    for (var key in obj){
      if (obj.hasOwnProperty(key)){
        //if (typeof obj === "object"){
        //  objCopy[key] = this.clone(obj[key]);
        //} else {
          objCopy[key] = obj[key];
        //}
      }
    }
    return objCopy;
  }
}
