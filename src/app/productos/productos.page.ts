
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonCard,
  IonList,
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonButton,
  IonIcon,
  IonBadge,
  IonFooter,
  IonRefresher,
  IonRefresherContent
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  cartOutline,
  chevronForwardOutline,
  trashOutline,
  homeOutline,
  gridOutline,
  receiptOutline,
  personOutline,
  basketOutline,
  eyeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonCard,
    IonList,
    IonItemSliding,
    IonItem,
    IonItemOptions,
    IonItemOption,
    IonButton,
    IonIcon,
    IonBadge,
    IonFooter,
    IonRefresher,
    IonRefresherContent,
    CommonModule,
    FormsModule
  ],
})
export class ProductosPage implements OnInit {

  // ==========================================
  // LISTA ORIGINAL DE PRODUCTOS
  // ==========================================

  todosLosProductos = [
    {
      id: 1,
      nombre: 'Galletas Ritz',
      descripcion: 'Galletas saladas sabor queso',
      precio: 45,
      imagen: '/assets/img/galletas-ritz.png',
      categoria: 'Snacks',
    },
    {
      id: 2,
      nombre: 'Coca-Cola',
      descripcion: 'Refresco de 500 ml',
      precio: 65,
      imagen: '',
      categoria: 'Bebidas',
    },
    {
      id: 3,
      nombre: 'Papas fritas',
      descripcion: 'Papas fritas clásicas',
      precio: 50,
      imagen: '',
      categoria: 'Snacks',
    },
    {
      id: 4,
      nombre: 'Leche',
      descripcion: 'Leche entera',
      precio: 80,
      imagen: '',
      categoria: 'Lácteos',
    },
  ];

  // ==========================================
  // PRODUCTOS QUE SE MUESTRAN EN PANTALLA
  // ==========================================

  productos = [...this.todosLosProductos];

  categoriaSeleccionada: string = '';

  // ==========================================
  // VARIABLES PARA EL GESTO DE ZOOM
  // ==========================================

  zoom: number = 1;

  distanciaInicial: number = 0;

  zoomInicial: number = 1;

  // ==========================================
  // VARIABLES PARA EL MENÚ CONTEXTUAL
  // ==========================================

  mostrarMenu: boolean = false;

  productoSeleccionado: any = null;

  temporizadorMenu: any;

  gestoActivado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

    addIcons({
      cartOutline,
      chevronForwardOutline,
      trashOutline,
      homeOutline,
      gridOutline,
      receiptOutline,
      personOutline,
      basketOutline,
      eyeOutline
    });

  }

  ngOnInit() {

    // LEER LA CATEGORÍA RECIBIDA DESDE CATEGORÍAS

    this.route.queryParamMap.subscribe(params => {

      this.categoriaSeleccionada = params.get('categoria') || '';

      this.filtrarProductos();

    });

  }

  // ==========================================
  // PULL TO REFRESH
  // DESLIZAR HACIA ABAJO PARA ACTUALIZAR
  // ==========================================

  refrescarProductos(event: any) {

    this.filtrarProductos();

    event.target.complete();

  }

  // ==========================================
  // FILTRAR PRODUCTOS POR CATEGORÍA
  // ==========================================

  filtrarProductos() {

    if (!this.categoriaSeleccionada) {

      this.productos = [...this.todosLosProductos];

      return;

    }

    if (this.categoriaSeleccionada === 'Alimentos') {

      this.productos = this.todosLosProductos.filter(producto =>
        producto.categoria === 'Snacks' ||
        producto.categoria === 'Lácteos'
      );

      return;

    }

    this.productos = this.todosLosProductos.filter(producto =>
      producto.categoria === this.categoriaSeleccionada
    );

  }

  // ==========================================
  // ELIMINAR PRODUCTO
  // ==========================================

  eliminarProducto(id: number) {

    this.todosLosProductos = this.todosLosProductos.filter(
      producto => producto.id !== id
    );

    this.filtrarProductos();

    this.cerrarMenuContextual();

  }

  // ==========================================
  // GESTO DE ZOOM EXCLUSIVO PARA LA IMAGEN
  // ==========================================

  iniciarZoom(event: TouchEvent) {

    // EVITAR QUE EL NAVEGADOR HAGA ZOOM A TODA LA PÁGINA

    if (event.cancelable) {
      event.preventDefault();
    }

    if (event.touches.length === 2) {

      this.distanciaInicial = this.calcularDistancia(
        event.touches[0],
        event.touches[1]
      );

      this.zoomInicial = this.zoom;

    }

  }

  aplicarZoom(event: TouchEvent) {

    // EVITAR EL ZOOM NATIVO DEL NAVEGADOR

    if (event.cancelable) {
      event.preventDefault();
    }

    if (event.touches.length === 2 && this.distanciaInicial > 0) {

      const distanciaActual = this.calcularDistancia(
        event.touches[0],
        event.touches[1]
      );

      const factor = distanciaActual / this.distanciaInicial;

      this.zoom = Math.min(
        3,
        Math.max(1, this.zoomInicial * factor)
      );

    }

  }

  finalizarZoom(event?: TouchEvent) {

    if (event && event.cancelable) {
      event.preventDefault();
    }

    this.distanciaInicial = 0;

    this.zoomInicial = this.zoom;

  }

  calcularDistancia(touch1: Touch, touch2: Touch): number {

    const diferenciaX = touch2.clientX - touch1.clientX;

    const diferenciaY = touch2.clientY - touch1.clientY;

    return Math.sqrt(
      diferenciaX * diferenciaX +
      diferenciaY * diferenciaY
    );

  }

  // ==========================================
  // MENÚ CONTEXTUAL
  // MANTENER PRESIONADO
  // ==========================================

  iniciarMenuContextual(event: TouchEvent, producto: any) {

    this.gestoActivado = false;

    this.temporizadorMenu = setTimeout(() => {

      this.productoSeleccionado = producto;

      this.mostrarMenu = true;

      this.gestoActivado = true;

    }, 600);

  }

  cancelarMenuContextual() {

    if (this.temporizadorMenu) {

      clearTimeout(this.temporizadorMenu);

    }

  }

  mostrarMenuContextual(event: MouseEvent, producto: any) {

    event.preventDefault();

    this.productoSeleccionado = producto;

    this.mostrarMenu = true;

  }

  cerrarMenuContextual() {

    this.mostrarMenu = false;

    this.productoSeleccionado = null;

    if (this.temporizadorMenu) {

      clearTimeout(this.temporizadorMenu);

    }

  }

  // ==========================================
  // VER DETALLES DEL PRODUCTO
  // ==========================================

  verDetallesProducto(producto: any) {

    alert(
      'PRODUCTO\n\n' +
      'Nombre: ' + producto.nombre + '\n' +
      'Categoría: ' + producto.categoria + '\n' +
      'Descripción: ' + producto.descripcion + '\n' +
      'Precio: RD$' + producto.precio.toFixed(2)
    );

    this.cerrarMenuContextual();

  }

  // ==========================================
  // ELIMINAR DESDE EL MENÚ
  // ==========================================

  eliminarDesdeMenu(id: number) {

    this.eliminarProducto(id);

  }

  // ==========================================
  // NAVEGACIÓN
  // ==========================================

  navegarInicio() {

    this.router.navigate(['/home']);

  }

  navegarCategorias() {

    this.router.navigate(['/categorias']);

  }

  navegarPedidos() {

    this.router.navigate(['/pedidos']);

  }

  navegarPerfil() {

    this.router.navigate(['/perfil']);

  }

}
