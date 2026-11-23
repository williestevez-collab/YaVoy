
import { Component, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonSearchbar,
  IonFooter,
  IonList,
  IonItem,
  IonCard,
  IonFab,
  IonFabButton,
  IonMenuButton
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  cartOutline,
  locationOutline,
  chevronDownOutline,
  chevronForwardOutline,
  home,
  gridOutline,
  receiptOutline,
  personOutline,
  micOutline,
  cameraOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonSearchbar,
    IonFooter,
    IonList,
    IonItem,
    IonCard,
    IonFab,
    IonFabButton,
    IonMenuButton,
    RouterLink
  ]
})
export class HomePage {

  searchTerm = '';
  isListening = false;
  voiceMessage = '';

  photoPreview: string | null = null;
  cameraMessage = '';

  constructor(
    private zone: NgZone,
    private router: Router
  ) {
    addIcons({
      cartOutline,
      locationOutline,
      chevronDownOutline,
      chevronForwardOutline,
      home,
      gridOutline,
      receiptOutline,
      personOutline,
      micOutline,
      cameraOutline
    });
  }

  // Navegar al detalle del producto
  verProducto() {
    this.router.navigate(['/producto/1']);
  }

  // Navegar a Inicio
  navegarInicio() {
    this.router.navigate(['/home']);
  }

  // Navegar a Categorías
  navegarCategorias() {
    this.router.navigate(['/categorias']);
  }

  // Navegar a Pedidos
  navegarPedidos() {
    this.router.navigate(['/pedidos']);
  }

  // Navegar a Perfil
  navegarPerfil() {
    this.router.navigate(['/perfil']);
  }

  // Actualizar el buscador al escribir
  onSearchInput(event: CustomEvent) {
    const inputEvent = event as CustomEvent<{ value?: string }>;
    this.searchTerm = inputEvent.detail?.value || '';
  }

  // Iniciar reconocimiento de voz
  startVoiceSearch() {
    if (this.isListening) {
      return;
    }

    const browser = window as Window & {
      SpeechRecognition?: new () => any;
      webkitSpeechRecognition?: new () => any;
    };

    const SpeechRecognition =
      browser.SpeechRecognition ||
      browser.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.voiceMessage =
        'Tu navegador no admite el reconocimiento de voz. Prueba con Google Chrome.';
      return;
    }

    const recognition = new SpeechRecognition();
    let receivedResult = false;

    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    this.isListening = true;
    this.voiceMessage = 'Preparando micrófono...';

    recognition.onstart = () => {
      this.zone.run(() => {
        this.isListening = true;
        this.voiceMessage = 'Te escucho... Habla ahora.';
      });
    };

    recognition.onresult = (event: any) => {
      this.zone.run(() => {
        const transcript = event.results?.[0]?.[0]?.transcript;

        if (transcript) {
          receivedResult = true;
          this.searchTerm = transcript.trim();
          this.voiceMessage = 'Búsqueda recibida: ' + this.searchTerm;
        }
      });
    };

    recognition.onnomatch = () => {
      this.zone.run(() => {
        this.voiceMessage =
          'No pude entender lo que dijiste. Inténtalo nuevamente.';
      });
    };

    recognition.onerror = (event: any) => {
      this.zone.run(() => {
        switch (event.error) {
          case 'not-allowed':
          case 'service-not-allowed':
            this.voiceMessage =
              'Chrome no tiene permiso para utilizar el micrófono.';
            break;

          case 'no-speech':
            this.voiceMessage =
              'No detecté ninguna voz. Habla más cerca del micrófono.';
            break;

          case 'network':
            this.voiceMessage =
              'Error de conexión con el servicio de reconocimiento de voz. Verifica Internet.';
            break;

          case 'audio-capture':
            this.voiceMessage =
              'No se pudo acceder al dispositivo de audio.';
            break;

          default:
            this.voiceMessage =
              'Ocurrió un error al reconocer tu voz: ' + event.error;
        }
      });
    };

    recognition.onend = () => {
      this.zone.run(() => {
        this.isListening = false;

        if (
          !receivedResult &&
          this.voiceMessage === 'Te escucho... Habla ahora.'
        ) {
          this.voiceMessage =
            'No se recibió ninguna frase. Pulsa el micrófono e inténtalo otra vez.';
        }
      });
    };

    try {
      recognition.start();
    } catch (error) {
      this.isListening = false;
      this.voiceMessage =
        'No se pudo iniciar el reconocimiento. Inténtalo nuevamente.';
    }
  }

  // Recibir fotografía desde la cámara o galería
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.cameraMessage = 'Selecciona un archivo de imagen válido.';
      input.value = '';
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      this.cameraMessage = 'La fotografía no debe superar los 10 MB.';
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.zone.run(() => {
        this.photoPreview = reader.result as string;
        this.cameraMessage =
          '¡Fotografía recibida correctamente! Ya puedes visualizar tu producto.';
      });
    };

    reader.onerror = () => {
      this.zone.run(() => {
        this.cameraMessage =
          'No se pudo cargar la fotografía. Inténtalo nuevamente.';
      });
    };

    reader.readAsDataURL(file);
    input.value = '';
  }
}
