import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from '../auth/auth.module';
import { PropertyModule } from '../property/property.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: 'properties',
            loadChildren: '../property/property.module#PropertyModule',
          },
          {
            path: 'auth',
            loadChildren: '../auth/auth.module#AuthModule',
          },
          {
            path: 'dashboard',
            loadChildren: '../dashboard/dashboard.module#DashboardModule',
          },
        ],
      },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' },
    ]),

    AuthModule,
    PropertyModule,
    DashboardModule,
  ],
})
export class LayoutModule {}
