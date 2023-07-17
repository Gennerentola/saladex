import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  urlPokedex: string = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  urlGetPkmn: string = 'https://pokeapi.co/api/v2/pokemon/';
  nomePokemonToCompare?: string;
  nomePokemonToFind?: string;

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<any> {
    return this.http.get(this.urlPokedex);
  }

  getSinglePokemon(url: string): Observable<any> {
    return this.http.get(url);
  }

  getDexDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonByDexNumber(dexNum: number): Observable<any> {
    return this.http.get(`${this.urlGetPkmn}${dexNum}/`);
  }

  getAbility(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPkmnToCompare(pkmnName:string): Observable<any> {
    return this.http.get<any>(`${this.urlGetPkmn}${pkmnName}`);
  }

}
