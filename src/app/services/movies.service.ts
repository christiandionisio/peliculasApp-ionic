import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaMDB } from '../interfaces/interfaces';

const URL = environment.url;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${API_KEY}&language=es&include_image_language=es`;

    console.log(query);

    return this.http.get<T>(query);
  }

  getFeatures() {

    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    let month = today.getMonth() + 1

    let monthString;

    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const start = `${today.getFullYear()}-${monthString}-01`;
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`);

  }

  getPopulares() {

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery(`/movie/${id}?a=1`);
  }
}
