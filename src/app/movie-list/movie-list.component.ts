import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, ViewChild } from '@angular/core';
import { Movie } from '../models/Movie';
import { MovieService } from '../movie.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

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
  displayedColumns = ['title', 'year', 'director'];
  dataSource: MatTableDataSource<Movie>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private movieService:MovieService){}

  initMatTableDataSource(){
    this.dataSource = new MatTableDataSource(this.movies); 
    this.dataSource.paginator = this.paginator;
    this.paginator.showFirstLastButtons=true;
    this.dataSource.sort = this.sort;
  }

  fetchAllMovies(){
    this.movieService.getData().subscribe(
      movies => this.movies = movies,
      error => console.log(error),
      () =>{
        this.initMatTableDataSource();
      }
    ); 
  }
  
  fetchMoviesByQuery(){
    this.movieService.getDataByQuery(this.input).subscribe(
      movies => this.movies = movies,
      error => console.log(error),
      () =>{
        this.initMatTableDataSource();
      }
    );
    this.input="";   
  }

  ngOnInit(){
    this.fetchAllMovies();  
  }

  onListItemClicked(movie:Movie){
    this.ListItemClick.emit(movie);
  }
}
