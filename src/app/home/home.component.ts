import { Component } from '@angular/core';
import { PokedexService } from '../services/pokedex.service';
import { BattleSimulatorService } from '../services/battle-simulator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor (private pokedexSrv: PokedexService, private battleSimulatorSrv: BattleSimulatorService) {}

  ngOnInit() {
    this.pokedexSrv.nomePokemonToFind = '';
    this.battleSimulatorSrv.setOwnPkmn(this.battleSimulatorSrv.emptyPkmnValue);
    this.battleSimulatorSrv.setEnemyPkmn(this.battleSimulatorSrv.emptyPkmnValue);
  }

}
