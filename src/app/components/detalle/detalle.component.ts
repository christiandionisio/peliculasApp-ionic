import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  cortar = 150;
  isFavorito = false;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DataLocalService) { }

  async ngOnInit() {
    // console.log('ID', this.id);

    this.isFavorito = await this.dataLocal.existePelicula(this.id);
    // console.log('Detalle component existe', existe);

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe(resp => {
        // console.log(resp);
        this.pelicula = resp;
      });

      this.moviesService.getActoresPelicula(this.id)
      .subscribe(resp => {
        // console.log(resp);
        this.actores = resp.cast;
      })
  }

  regresar() {
    this.modalCtrl.dismiss({
      isFavorito: this.isFavorito
    });
  }

  async favoritos() {

    this.dataLocal.guardarPelicula(this.pelicula);
    this.isFavorito = await this.dataLocal.existePelicula(this.id);

  }

}
