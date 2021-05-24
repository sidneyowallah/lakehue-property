import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { PropertyCreateComponent } from './components/property-create/property-create.component';
import { PropertyUpdateComponent } from './components/property-update/property-update.component';
import { PropertyComponent } from './property.component';

const routes: Routes = [
  {
    path: '',
    component: PropertyComponent,
    children: [
      {
        path: 'list',
        component: PropertyListComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: PropertyCreateComponent,
      },
      {
        path: 'details/:id',
        component: PropertyDetailComponent,
      },
      {
        path: 'details/:id/update',
        component: PropertyUpdateComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyDetailComponent,
    PropertyCreateComponent,
    PropertyUpdateComponent,
    PropertyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PropertyModule {}
