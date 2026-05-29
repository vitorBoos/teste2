import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidebarModule, MenuModule, ButtonModule],
  template: `
    <div class="layout">
      <div class="sidebar">
        <h3>Pet Shop</h3>
        <p-menu [model]="items"></p-menu>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .layout { display: flex; height: 100vh; }
    .sidebar { width: 250px; padding: 1rem; border-right: 1px solid #ccc; }
    .content { flex: 1; padding: 1rem; }
  `]
})
export class HomeComponent {
  items = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Usuários', routerLink: '/users' },
    { label: 'Clientes', routerLink: '/clientes' },
    { label: 'Pets', routerLink: '/pets' }
  ];
}
