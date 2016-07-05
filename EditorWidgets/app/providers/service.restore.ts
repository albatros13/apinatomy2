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
    if (obj.constructor === Array) {
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

  // clone(originalObject: any, circular: any){
  //   let propertyIndex: any, descriptor: any,
  //     keys: any, current: any, nextSource: any, indexOf: number,
  //     copies: any = [ {
  //       source: originalObject ,
  //       target: Object.create( Object.getPrototypeOf( originalObject ) )
  //     } ] ,
  //     cloneObject = copies[ 0 ].target ,
  //     sourceReferences = [ originalObject ] ,
  //     targetReferences = [ cloneObject ] ;
  //
  //   // First in, first out
  //   while ( current = copies.shift() ){
  //     keys = Object.getOwnPropertyNames( current.source ) ;
  //
  //     for ( propertyIndex = 0 ; propertyIndex < keys.length ; propertyIndex ++ ){
  //       // Save the source's descriptor
  //       descriptor = Object.getOwnPropertyDescriptor( current.source , keys[ propertyIndex ] ) ;
  //
  //       if ( ! descriptor.value || typeof descriptor.value !== 'object' ){
  //         Object.defineProperty( current.target , keys[ propertyIndex ] , descriptor ) ;
  //         continue ;
  //       }
  //
  //       nextSource = descriptor.value ;
  //       descriptor.value = Array.isArray( nextSource ) ?
  //         [] :
  //         Object.create( Object.getPrototypeOf( nextSource ) ) ;
  //
  //       if ( circular ){
  //         indexOf = sourceReferences.indexOf( nextSource ) ;
  //
  //         if ( indexOf !== -1 ){
  //           // The source is already referenced, just assign reference
  //           descriptor.value = targetReferences[ indexOf ] ;
  //           Object.defineProperty( current.target , keys[ propertyIndex ] , descriptor ) ;
  //           continue ;
  //         }
  //
  //         sourceReferences.push( nextSource ) ;
  //         targetReferences.push( descriptor.value ) ;
  //       }
  //
  //       Object.defineProperty( current.target , keys[ propertyIndex ] , descriptor ) ;
  //
  //       copies.push( { source: nextSource , target: descriptor.value } ) ;
  //     }
  //   }
  //
  //   return cloneObject ;
  // }

}
