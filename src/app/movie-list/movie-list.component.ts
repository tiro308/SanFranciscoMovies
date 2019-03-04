import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from '../models/Movie';
import { MovieService } from '../movie.service';
import { filterQueryId } from '@angular/core/src/view/util';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies:Movie[];
  @Output() ListItemClick = new EventEmitter<Movie>();
  @Input() inputText:string;
  input:string;
  inputYear:number;

  constructor(private movieService:MovieService){}

  fetchAllMovies(){
    this.movieService.getData().subscribe(movies =>{
      this.movies = movies;
    })
  }
  
  fetchMoviesByName(){
    this.movieService.getDataByQuery(this.input).subscribe(movies =>{
      this.movies = movies;
    });
    this.input="";   
  }

  fetchMoviesByYear(){
    this.movieService.getDataByYear(this.inputYear).subscribe(movies =>{
      this.movies = movies;
    });
    this.inputYear=null;
  }

  ngOnInit(){
    this.fetchAllMovies();
  }

  onSubmitMovieTitle(){
    //this.inputTextAdded.emit(this.input);
    this.filterListByName(this.input);
    console.log(this.input);
    this.input="";
  }

  ngOnChanges(){
    console.log("ngOnChanges movie list " + this.inputText);
    this.filterListByName(this.inputText);
  }

  ngDoCheck(){
  }

  onListItemClicked(movie:Movie){
    this.ListItemClick.emit(movie);
  }

  filterListByName(input:string){
    this.movies = this.movies.filter((m)=> {return m.title==input});
  }
}
