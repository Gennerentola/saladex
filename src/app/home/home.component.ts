import { Component } from '@angular/core';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor (private pokedexSrv: PokedexService) {}

  ngOnInit() {
    this.pokedexSrv.nomePokemonToFind = '';
  }

}
