import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelfManagementComponent } from './shelf-management/shelf-management.component';
import { AddShelfComponent } from './add-shelf/add-shelf.component';
import { EditShelfComponent } from './edit-shelf/edit-shelf.component';

const routes: Routes = [
  { path: '', component: ShelfManagementComponent, pathMatch: 'full' },
  { path: 'addShelf', component: AddShelfComponent},
  { path: 'editShelf', component: EditShelfComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelfRoutingModule { }
