import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { PropertyUpdateComponent } from './components/property-update/property-update.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'properties', component: PropertyListComponent },
      { path: 'properties/:id', component: PropertyDetailComponent },
      { path: 'properties/:id/edit', component: PropertyUpdateComponent },
    ]),
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PropertyListComponent,
    PropertyDetailComponent,
    PropertyUpdateComponent,
  ],
})
export class PropertyModule {}
