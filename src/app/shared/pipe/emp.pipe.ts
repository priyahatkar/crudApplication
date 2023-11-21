import { Pipe, PipeTransform } from '@angular/core';
import { Iemployee } from '../model/empInterFace';

@Pipe({
  name: 'emp'
})
export class EmpPipe implements PipeTransform {

  transform(value: Iemployee[], searchString: string): Iemployee[] {
    if(!searchString){
      return value
    }

    if(!value){
      return []
    }
    
    let arrayEmp = value.filter(res =>{
      return res.fName.toLowerCase().includes(searchString.toLowerCase())
    })
    return arrayEmp
  }

}
