import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelfRoutingModule } from './shelf-routing.module';
import { ShelfManagementComponent } from './shelf-management/shelf-management.component';
import { AddShelfComponent } from './add-shelf/add-shelf.component';
import { EditShelfComponent } from './edit-shelf/edit-shelf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShelfManagementComponent,
    AddShelfComponent,
    EditShelfComponent
  ],
  imports: [
    CommonModule,
    ShelfRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ShelfModule { }
