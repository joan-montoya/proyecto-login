import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SiginComponent } from './Components/sigin/sigin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sigin', component: SiginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
