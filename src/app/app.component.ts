import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  homeOutline,
  gridOutline,
  receiptOutline,
  personOutline,
  basketOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    RouterLink
  ],
})
export class AppComponent {

  constructor() {

    addIcons({
      homeOutline,
      gridOutline,
      receiptOutline,
      personOutline,
      basketOutline
    });

  }

}