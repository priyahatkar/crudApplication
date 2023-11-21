import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpDashBoardComponent } from './shared/components/emp-dash-board/emp-dash-board.component';
import { EmpFormComponent } from './shared/components/emp-form/emp-form.component';
import { EmpTableComponent } from './shared/components/emp-table/emp-table.component';
import { materialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConforimDeleteComponent } from './shared/components/conforim-delete/conforim-delete.component';
import { EmpPipe } from './shared/pipe/emp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmpDashBoardComponent,
    EmpFormComponent,
    EmpTableComponent,
    ConforimDeleteComponent,
    EmpPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
