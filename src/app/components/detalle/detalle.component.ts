import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    // console.log('ID', this.id);

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe(resp => {
        console.log(resp);
      })
  }

}
