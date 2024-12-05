import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialoghandlerComponent } from './dialoghandler.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'demomodel',
    component: DialoghandlerComponent,

    data: { animation: 'datatables' }
  },

];
@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: []
})
export class DialoghandlerModule { }
