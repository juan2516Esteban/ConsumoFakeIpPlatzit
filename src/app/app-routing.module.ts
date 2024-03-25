import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetFakeIpComponent } from './Components/get-fake-ip/get-fake-ip.component';

const routes: Routes = [
  {
    path: 'PrimeraVista',
    component: GetFakeIpComponent,
  },
  {
    path: '**',
    redirectTo: 'PrimeraVista',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
