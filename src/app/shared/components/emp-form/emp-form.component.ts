import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EmpolyeeService } from '../../service/empolyee.service';
import { Iemployee } from '../../model/empInterFace';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent implements OnInit {
  public empForm !: FormGroup;
  public editMode : boolean = false;
  public editId !: Iemployee;
  public searchFilterTodo !: string
  constructor(@Inject(MAT_DIALOG_DATA)getEmp : Iemployee,
              private _empService : EmpolyeeService,
              private _dialogRef : MatDialogRef<EmpFormComponent>) { 
    this.createForm()
    this.editId = getEmp;
    console.log(`get id`, this.editId);
    if(getEmp){
    this.empForm.patchValue(getEmp);
    this.editMode = true;
    this._empService.getUpdateEmp(getEmp)
    }
  }

  ngOnInit(): void {
  }

  createForm(){
    this.empForm = new FormGroup({
      fName : new FormControl(null, [Validators.required]),
      lName : new FormControl(null, [Validators.required]),
      contact : new FormControl(null, [Validators.required]),
      email : new FormControl(null, [Validators.required]),
      dateOfBirth : new FormControl(null, [Validators.required]),
      gender : new FormControl(null, [Validators.required]),
      experience : new FormControl(null, [Validators.required]),
      education : new FormControl(null, [Validators.required]),
      company : new FormControl(null, [Validators.required])
    })
  }

  onCloseForm(){
    this._dialogRef.close()
  }

  onEmpFormSubmit(){
    if(this.empForm.valid){
      let empData = this.empForm.value;
      console.log(empData);
      this._empService.toCreateEmpForm(empData)
        .subscribe(res =>{
          this._empService.sendEmpData(empData)
          this._dialogRef.close()
        })
        this.empForm.reset()
    }
  }

  onUpdateEmpInfo(){
    let updatedId : Iemployee = {...this.empForm.value, id : this.editId.id}
    console.log(updatedId);
    this._empService.getUpdateEmp(updatedId)
      .subscribe(res =>{
        this._empService.sendUpdateEmp(updatedId)
        this._dialogRef.close()
      })
  }
}
