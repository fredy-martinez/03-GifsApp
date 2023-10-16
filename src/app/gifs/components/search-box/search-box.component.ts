import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5> Buscar:</h5>
  <input typer="text"
  class="form-control"
  placeholder= "Buscar gifs.."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >`
})

export class SearchBoxComponent{

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef <HTMLInputElement>; // Aqui el ! es not null operator siempre va a tener un valor

  constructor( private gifsService: GifsService) { }

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';


  }
}
