import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelfManagementComponent } from './shelf-management/shelf-management.component';
import { AddShelfComponent } from './add-shelf/add-shelf.component';
import { EditShelfComponent } from './edit-shelf/edit-shelf.component';
import { roleCheckGuard } from '../../shared/guard/role-check.guard';
import { ROLE_REPORT_READER, ROLE_WAREHOUSE_SUPERVISOR } from '../../shared/model/constant';

const routes: Routes = [
  { path: '', title:'Stokwise - Shelf', component: ShelfManagementComponent, pathMatch: 'full' },
  { path: 'addShelf', component: AddShelfComponent, canActivate:[roleCheckGuard(ROLE_WAREHOUSE_SUPERVISOR)]},
  { path: 'editShelf', component: EditShelfComponent, canActivate:[roleCheckGuard(ROLE_WAREHOUSE_SUPERVISOR)]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelfRoutingModule { }
