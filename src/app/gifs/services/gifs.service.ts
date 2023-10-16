import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    //Validación de que no acepte tags con el mismo nombre
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag ) //el filter solo trae expresiones verdaderas entonces solo traera tags con nombres diferentes
    }
    // Que lo imprima al inicio el tag que se volvió a buscar
    this._tagsHistory.unshift(tag);

    //Solo mostrar los primeros 10 tags
    this._tagsHistory = this._tagsHistory.splice(0,10);
  }

  searchTag ( tag: string): void{

    //Validacion de que no vaya vacío
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    console.log(this._tagsHistory);
  }

}
