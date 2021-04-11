import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() isFavorito = new EventEmitter();

  slidesOpts = {
    slidesPerView: 3.2,
    freeMode: true
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }

    });

    modal.onDidDismiss()
      .then((data) => {
        // console.log(data['data'].isFavorito);
        this.isFavorito.emit(data['data'].isFavorito);
    });

    modal.present();
  }

}
