
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonBadge,
  IonCard,
  IonList,
  IonItem,
  IonFooter,
  IonRefresher,
  IonRefresherContent
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  cartOutline,
  receiptOutline,
  timeOutline,
  bagHandleOutline,
  chevronForwardOutline,
  homeOutline,
  gridOutline,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonBadge,
    IonCard,
    IonList,
    IonItem,
    IonFooter,
    IonRefresher,
    IonRefresherContent,
    CommonModule,
    FormsModule
  ],
})
export class PedidosPage implements OnInit {

  constructor() {
    addIcons({
      cartOutline,
      receiptOutline,
      timeOutline,
      bagHandleOutline,
      chevronForwardOutline,
      homeOutline,
      gridOutline,
      personOutline
    });
  }

  ngOnInit() {}

  actualizarPedidos(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  // Métodos temporales para evitar errores de compilación
  navegarInicio() {}

  navegarCategorias() {}

  navegarPedidos() {}

  navegarPerfil() {}

}
