import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'producto/:id',
    loadComponent: () => import('./producto-detalle/producto-detalle.page').then((m) => m.ProductoDetallePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'productos',
    loadComponent: () => import('./productos/productos.page').then((m) => m.ProductosPage),
  },
  {
    path: 'pedidos',
    loadComponent: () => import('./pedidos/pedidos.page').then((m) => m.PedidosPage),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then((m) => m.PerfilPage),
  },
  {
    path: 'categorias',
    loadComponent: () => import('./categorias/categorias.page').then((m) => m.CategoriasPage),
  },
];
