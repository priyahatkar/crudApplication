import { Injectable } from '@angular/core';
import { Observable, Subject, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iemployee } from '../model/empInterFace';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpolyeeService {
  public empUrl : string = `${environment.baseUrl}/emp.json`;
  private empObserver$ : Subject<Iemployee> = new Subject<Iemployee>();
  public empObservable = this.empObserver$.asObservable()
  private empUpdateObserver$ : Subject<Iemployee> = new Subject<Iemployee>();
  public empUpdateObservable = this.empUpdateObserver$.asObservable()
  constructor(private _http : HttpClient) { }

  getAllEmpData(): Observable<Iemployee[]>{
    return this._http.get<Iemployee[]>(this.empUrl)
    .pipe(
      map((res) =>{
        let empArray : Array<Iemployee> = []
        for (const key in res) {
          empArray.push({...res[key], id : key})
        }
        return empArray
      })
    )
  }

  toCreateEmpForm(emp : Iemployee){
    return this._http.post(this.empUrl, emp)
  }

  sendEmpData(emp : Iemployee){
    this.empObserver$.next(emp)
  }

  getUpdateEmp(info : Iemployee): Observable<Iemployee>{
    let updateUrl = `${environment.baseUrl}/emp/${info.id}.json`
    return this._http.patch<Iemployee>(updateUrl, info)
  }

  sendUpdateEmp(emp : Iemployee){
    this.empUpdateObserver$.next(emp)
  }
  
  deleteEmpInfo(id : string): Observable<null>{
    let deleteUrl = `${environment.baseUrl}/emp/${id}.json`;
    return this._http.delete<null>(deleteUrl)
  }
}
