import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { RimsComponent } from './rims/rims.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: '', component: HomeComponent,canActivate:[AuthGuard], pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'rims', component: RimsComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
