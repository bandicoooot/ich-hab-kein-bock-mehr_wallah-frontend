import { Routes } from '@angular/router';
import { VehiclesComponent } from './pages/vehicles/vehicles';
import { CustomersComponent } from './pages/customers/customers';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'customers', component: CustomersComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
