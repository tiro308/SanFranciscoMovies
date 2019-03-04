import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Movie } from './models/Movie';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-App-Token' : 'zhMvrXwu7ECuTWgWvDuzd4hMU'

  })
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private Url:string = 'https://data.sfgov.org/resource/wwmu-gmzc.json';

  constructor(private http:HttpClient) {}

  getData():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.Url + "?$limit=2000", httpOptions);
  }

  getDataByQuery(title:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(this.Url + "?$q=" + title, httpOptions);
    //return this.http.get<Movie[]>(this.Url + "?$where=UPPER(title)='" + title.toUpperCase() + "'", httpOptions);
  }

  getDataByYear(year:number):Observable<Movie[]>{
    return this.http.get<Movie[]>(this.Url + "?release_year=" + year, httpOptions);
  }

}
