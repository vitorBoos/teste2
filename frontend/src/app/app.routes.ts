import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { PetListComponent } from './components/pet-list/pet-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: 'users', component: UserListComponent },
    { path: 'clientes', component: ClienteListComponent },
    { path: 'pets', component: PetListComponent }
  ]}
];
