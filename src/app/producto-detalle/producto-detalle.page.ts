
import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonBadge,
  IonFooter
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  cartOutline,
  heartOutline,
  addOutline,
  removeOutline,
  storefrontOutline,
  chevronForwardOutline,
  home,
  gridOutline,
  receiptOutline,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonBadge,
    IonFooter
  ],
})
export class ProductoDetallePage {

  producto = {
    id: '',
    nombre: 'Galletas Ritz',
    descripcion: 'Galletas saladas para compartir.',
    precio: 45.00,
    comercio: 'Colmado La Esquina',
    imagen: '/assets/img/galletas-ritz.png'
  };

  cantidad = 1;
  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {
    addIcons({
      arrowBackOutline,
      cartOutline,
      heartOutline,
      addOutline,
      removeOutline,
      storefrontOutline,
      chevronForwardOutline,
      home,
      gridOutline,
      receiptOutline,
      personOutline
    });

    this.producto.id =
      this.route.snapshot.paramMap.get('id') || '1';
  }

  aumentarCantidad() {
    this.cantidad++;
  }

  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  agregarAlCarrito() {
    this.mensaje =
      `${this.cantidad} unidad(es) de ${this.producto.nombre} seleccionada(s).`;
  }

  regresar() {
    this.location.back();
  }
}
