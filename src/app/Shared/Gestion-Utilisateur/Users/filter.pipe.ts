import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class filterPipe implements PipeTransform {

  transform(list: any[], filters: Object) {
    const keys       = Object.keys(filters).filter(key => filters[key]);
    
    const filterObject = object => keys.every(key => this.value(object,key,filters) );
     
    
  

    return keys.length ? list.filter(filterObject) : list;
  }

  value(object:Object ,key:string,filters:Object):boolean
  {
    if(isNaN(object[key]))
            {
          return object[key].toUpperCase().indexOf(filters[key].toUpperCase())!=-1
               }
             
           else{
              return object[key].toString().indexOf(filters[key].toString())!=-1
             }
  }
}