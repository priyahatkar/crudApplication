import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conforim-delete',
  templateUrl: './conforim-delete.component.html',
  styleUrls: ['./conforim-delete.component.scss']
})
export class ConforimDeleteComponent implements OnInit {

  constructor(private _dailogRef : MatDialogRef<ConforimDeleteComponent>) { }

  ngOnInit(): void {
  }

  onCancel(){
    this._dailogRef.close(false)
  }

  onConfirmDelete(){
    this._dailogRef.close(true)
  }
}
