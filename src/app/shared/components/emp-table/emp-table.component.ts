import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Iemployee } from '../../model/empInterFace';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConforimDeleteComponent } from '../conforim-delete/conforim-delete.component';
import { EmpolyeeService } from '../../service/empolyee.service';

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.scss']
})
export class EmpTableComponent implements OnInit {
  @Input() empInfo !: Array<Iemployee>
  public searchFilterTodo !: string
  resultsLength = 0;
  @Output() emitEmployee: EventEmitter<Iemployee> = new EventEmitter<Iemployee>();
  @Output() emitDeleteEmployee: EventEmitter<string> = new EventEmitter<string>();
  constructor(private dailogRef : MatDialog,
              private _empService : EmpolyeeService) { }

  ngOnInit(): void {
  }

  onEditEmpInfo(emp : Iemployee){
    console.log('click');
    this.emitEmployee.emit(emp);
  }

  onDeleteEmp(empId : string){
    let dialogConfig = this.dailogRef.open(ConforimDeleteComponent)

    dialogConfig.afterClosed()
      .subscribe(getConformation =>{
        if(getConformation){
          this._empService.deleteEmpInfo(empId)
            .subscribe(res =>{
              this.emitDeleteEmployee.emit(empId)
            })
        }
      })
  }
}
