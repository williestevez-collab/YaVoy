import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  personOutline,
  createOutline,
  callOutline,
  mailOutline,
  receiptOutline,
  heartOutline,
  locationOutline,
  notificationsOutline,
  helpCircleOutline,
  informationCircleOutline,
  logOutOutline,
  chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class PerfilPage implements OnInit {

  constructor() {
    addIcons({
      personOutline,
      createOutline,
      callOutline,
      mailOutline,
      receiptOutline,
      heartOutline,
      locationOutline,
      notificationsOutline,
      helpCircleOutline,
      informationCircleOutline,
      logOutOutline,
      chevronForwardOutline
    });
  }

  ngOnInit() {
  }

}