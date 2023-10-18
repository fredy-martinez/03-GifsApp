import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifslist: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:     string = 'oa60E2F6ztjeBsq3Fd377FkHQZ0tXfTj'
  private servuceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string){
   tag = tag.toLowerCase();

    //Validación de que no acepte tags con el mismo nombre
    console.log(this._tagsHistory);
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag ) //el filter solo trae expresiones verdaderas entonces solo traera tags con nombres diferentes
      
    }
    // Que lo imprima al inicio el tag que se volvió a buscar
    this._tagsHistory.unshift(tag);

    

    //Solo mostrar los primeros 10 tags
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }

  searchTag ( tag: string): void {

    //Validacion de que no vaya vacío
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set ('api_key', this.apiKey)
      .set ('limit', 10)
      .set ('q', tag)

    this.http.get<SearchResponse>(`${this.servuceUrl}/search`, { params })
      .subscribe( resp => {

        this.gifslist = resp.data;
        console.log({gifs: this.gifslist});
        
      })
   
  }

}
