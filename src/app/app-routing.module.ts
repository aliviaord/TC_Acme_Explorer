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
import { DisplayAuditComponent } from './components/audit/display-audit/display-audit.component';
import { AuditListComponent } from './components/audit/audit-list/audit-list.component';
import { CreateAuditComponent } from './components/audit/create-audit/create-audit.component';
import { TripApplicationListComponent } from './components/tripApplication/trip-application-list/trip-application-list.component';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { DashboardDisplayComponent } from './components/dashboard/dashboard-display/dashboard-display.component';
import { TripApplicationPaymentComponent } from './components/tripApplication/trip-application-payment/trip-application-payment.component';
import { FinderDisplayComponent } from './components/finder/finder-display/finder-display.component';
import { EditActorComponent } from './components/actor/edit-actor/edit-actor.component';

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
  {path: 'edit-profile', component: EditActorComponent,
  canActivate: [ActorRoleGuard], data: {expectedRole: 'MANAGER|EXPLORER|AUDITOR|SPONSOR|ADMINISTRATOR'}
  },
  {path: 'new-trip', component: CreateTripComponent,
  canActivate: [ActorRoleGuard], data: {expectedRole: 'MANAGER'}
  },
  {path: 'audits', children: [
    {path: ':id', component: DisplayAuditComponent},
    {path: '', component: AuditListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'AUDITOR'}},
  ]},
  {path: 'new-audit', component: CreateAuditComponent,
  canActivate: [ActorRoleGuard], data: {expectedRole: 'AUDITOR'}
  },
  {path: 'tripApplications', component: TripApplicationListComponent, canActivate: [ActorRoleGuard],
    data: {expectedRole: 'MANAGER|EXPLORER'}},
  {path: 'sponsorships', component: SponsorshipListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
  {path: 'dashboard', component: DashboardDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'ADMINISTRATOR'}},
  {path: 'finder', component: FinderDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'EXPLORER'}},
  {path: 'not-found', component: NotFoundPageComponent},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'denied-access', component: DeniedAccessPageComponent},
  {path: 'application-payment', component: TripApplicationPaymentComponent,
    canActivate: [ActorRoleGuard], data: {expectedRole: 'EXPLORER'}},
  {path: '**', redirectTo: '/not-found'},
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
