import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EafConfigurationService } from '@webkit/shared';

@Component({
  selector: 'eaf-gestione-foto',
  templateUrl: './gestione-foto.component.html',
  styleUrls: ['./gestione-foto.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestioneFotoComponent implements OnInit {
  @Input() labelAsset?: string;
  @Input() labelAsta?: string;
  @Input() labelPrezzoBase?: string | number;
  @Input() fotoAsset: string[] = [];
  @Input() fatherId: string;
  @Input() idFoto = './assets/images/noimagePlaceholder.png';
  @Output() isSelected: EventEmitter<string> = new EventEmitter();

  fotoPrincipale: string;
  fotoDaVisualizzare: string[];
  inizio = 0;
  numeroFotoDaVisualizzare = 4;
  img: string;
  urlBase: string;
  idRandom: number;

  constructor(private conf: EafConfigurationService) {
    this.idRandom = Math.round(Math.random() * 1000);
  }

  ngOnInit() {
    this.urlBase = this.conf.getApi('am.foto.get').urlComplete.replace(':idFoto', '');
    this.fotoPrincipale = this.fotoAsset[0];
    this.inizio = 1;
    this.calcolaFoto();
  }

  cambiaFoto(idFoto: string) {
    this.fotoPrincipale = idFoto;
    this.calcolaFoto();
  }

  calcolaFoto() {
    this.fotoDaVisualizzare = [];
    let i = this.inizio;
    let count = 1;
    while (count <= this.numeroFotoDaVisualizzare && count < this.fotoAsset.length && i <= this.fotoAsset.length) {
      if (i === this.fotoAsset.length) {
        i = 0;
      }
      if (this.fotoPrincipale !== this.fotoAsset[i]) {
        this.fotoDaVisualizzare.push(this.fotoAsset[i]);
        count++;
      }
      i++;
    }
  }

  seleziona() {
    this.isSelected.emit(this.fatherId);
  }

  moveCarousel(action: number) {
    this.inizio = this.inizio + action;
    if (this.inizio === this.fotoAsset.length) {
      this.inizio = 0;
    }
    if (this.inizio <= 0) {
      this.inizio = this.fotoPrincipale === this.fotoAsset[0] ? 1 : 0;
    }
    this.calcolaFoto();
  }
}
