import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RimsComponent } from './rims/rims.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'rims',component: RimsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
