import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] =[];
  ideas: string[] =['Spiderman', 'Avengers', 'El señor de los anillos'];
  buscando = false;

  constructor(private movieService: MoviesService,
              private modalCtrl: ModalController) {}

  buscar(event) {
    const valor = event.detail.value;
    this.buscando = true;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.movieService.getPeliculas(valor)
      .subscribe(resp => {
        // console.log(resp);
        this.buscando = false;
        this.peliculas = resp['results'];
      });

  }

  async abirModal(id) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }

    });

    modal.present();
  }

}
