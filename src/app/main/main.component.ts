import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { IMoviesResult } from 'src/interface/IMoviesResult';
import { MovieListService } from 'src/services/movie-list.service';
import { PurchaseTicketsComponent } from './purchase-tickets/purchase-tickets.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  movieId: number;
  movieTime: string;
  public _movieList: Observable<IMoviesResult[]>;
  constructor(private movie: MovieListService, private dialog:MatDialog) { }

  ngOnInit() {
    this._movieList = this.movie.fetchMovieList()
    
  }

  getImage(img: string) {
    return `https://image.tmdb.org/t/p/w500${img}`
  }

  setMovieDetails(id, index, title) {
    this.movieId = id;
    let hours = new Date(new Date().setHours(8 + (index * 2), 0, 0));
    this.movieTime = (hours.getHours() < 12) ? `${hours.getHours()}:30 AM` : `${hours.getHours()}:30 PM`

    this.dialog.open(PurchaseTicketsComponent, {
      data:{id: id, time:this.movieTime, title:title}
    })
  }
}
