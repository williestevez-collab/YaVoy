import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonInput,
  IonFooter
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  bagHandleOutline,
  cartOutline,
  fastFoodOutline,
  beerOutline,
  homeOutline,
  sparklesOutline,
  heartOutline,
  phonePortraitOutline,
  medkitOutline,
  pawOutline,
  searchOutline,
  gridOutline,
  receiptOutline,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonInput,
    IonFooter,
    CommonModule,
    FormsModule
  ],
})
export class CategoriasPage implements OnInit {

  constructor(private router: Router) {
    addIcons({
      bagHandleOutline,
      cartOutline,
      fastFoodOutline,
      beerOutline,
      homeOutline,
      sparklesOutline,
      heartOutline,
      phonePortraitOutline,
      medkitOutline,
      pawOutline,
      searchOutline,
      gridOutline,
      receiptOutline,
      personOutline
    });
  }

  ngOnInit() {}

  seleccionarCategoria(categoria: string) {
    this.router.navigate(['/productos'], {
      queryParams: {
        categoria: categoria
      }
    });
  }

  navegarInicio() {}

  navegarPedidos() {}

  navegarPerfil() {}

}