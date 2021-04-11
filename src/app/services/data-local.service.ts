import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private toastCrtl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCrtl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    for( const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agrefada a favoritos';
    }

    this.presentToast(mensaje);

    const store = new Storage();
    await store.create();

    store.set('peliculas', this.peliculas);
  }

  async cargarFavoritos() {

    const store = new Storage();
    await store.create();

    const peliculas = await store.get('peliculas');
    this.peliculas = peliculas || [];

    return this.peliculas;
  }

  async existePelicula(id) {
    id = Number(id);

    await this.cargarFavoritos();

    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true: false;
  }
}
