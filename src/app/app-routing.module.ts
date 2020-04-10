import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { CreateTripComponent } from './components/trip/create-trip/create-trip.component';
import { EditTripComponent } from './components/trip/edit-trip/edit-trip.component';
import { MainComponent } from './components/master/main/main.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { DeniedAccessPageComponent } from './components/security/denied-access-page/denied-access-page.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full'},
  {
    path: 'login', component: LoginComponent,
    canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}
  },
  {
    path: 'register', component: RegisterComponent,
    canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}
  },
  {path: 'trips', children: [
    {path: ':id', component: TripDisplayComponent},
    {path: '', component: TripListComponent},
    {path: ':id/edit', component: EditTripComponent}
  ]},
  {path: 'my-trips', component: TripListComponent,
  canActivate: [ActorRoleGuard], data: {expectedRole: 'MANAGER'}
  },
  {path: 'new-trip', component: CreateTripComponent,
  canActivate: [ActorRoleGuard], data: {expectedRole: 'MANAGER'}
  },
  {path: 'not-found', component: NotFoundPageComponent},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'denied-access', component: DeniedAccessPageComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
