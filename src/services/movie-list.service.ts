import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMoviesResult } from 'src/interface/IMoviesResult';
import { RequestService } from './request.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private requestService: RequestService) {

  }

  fetchMovieList(): Observable<Array<IMoviesResult>> {
    const url = "https://api.themoviedb.org/3/movie/now_playing";
    return this.requestService.getRequest(url, {
      params: { 'api_key': 'ee4ea4ebc3e0f64ceb3398911c833446', 'language': 'en-US', 'page': '1' },
      responseType: "json"
    }).pipe(map((res: any) => res.results))
  }
}
