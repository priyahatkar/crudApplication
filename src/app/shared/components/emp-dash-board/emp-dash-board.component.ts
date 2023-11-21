
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EmpFormComponent } from '../emp-form/emp-form.component';
import { EmpolyeeService } from '../../service/empolyee.service';
import { Iemployee } from '../../model/empInterFace';

@Component({
  selector: 'app-emp-dash-board',
  templateUrl: './emp-dash-board.component.html',
  styleUrls: ['./emp-dash-board.component.scss']
})
export class EmpDashBoardComponent implements OnInit {
  public employeArray : Array<Iemployee> =[]
  constructor(private matDialogRef : MatDialog,
              private _empService : EmpolyeeService) { }

  ngOnInit(): void {
    this._empService.getAllEmpData()
      .subscribe(res =>{
        console.log(res);
        this.employeArray = res
      })

      this._empService.empObservable
        .subscribe(res =>{
          this.employeArray.push(res)
        })

      this._empService.empUpdateObservable
        .subscribe(res =>{
          this.employeArray.forEach(emp =>{
            if(emp.id === res.id){
              emp.company = res.company,
              emp.contact = res.contact,
              emp.dateOfBirth = res.dateOfBirth,
              emp.education = res.education,
              emp.email = res.email,
              emp.experience = res.experience,
              emp.fName = res.fName,
              emp.gender = res.gender,
              emp.lName = res.lName
            }
          })
        })
  }

  openEmpForm(){
    const dailogConf = new MatDialogConfig()
    dailogConf.disableClose = true;
    const dialog = this.matDialogRef.open(EmpFormComponent, dailogConf)
  }

  emitEditEmpInfo(info : Iemployee){
    const dialogConf = new MatDialogConfig()
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.data = info;
    const dailog = this.matDialogRef.open(EmpFormComponent,dialogConf)
  }

  onDeleteEmpInfo(id : string){
    let getIndex = this.employeArray.findIndex(empId => empId.id === id);

    let deleteIndex = this.employeArray.splice(getIndex,1)
  }
}
