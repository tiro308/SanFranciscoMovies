import { Component, ViewContainerRef } from '@angular/core';
import { Movie } from './models/Movie';
import { ComponentPortal } from '@angular/cdk/portal';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SanFranciscoMoviesApp';
  movie:Movie;
  InputText:string;
  showMD:boolean;

  constructor(){}

  ngOnInit(){
  }

  onListItemClicked(movie:Movie){
    this.movie = movie;
    this.showMD=true;
  }

  getMovie(){
    return this.movie;
  }

  getInputText(){
    return this.InputText;
  }

  hideMD(){
    this.showMD=false;
  }

  // onInputTextAdded(input){
  //   this.InputText = input;
  //   console.log("app.c. onInputTextAdded " + this.InputText);
  //   return this.InputText;
  // }

  ngOnChanges(){
  }
}
