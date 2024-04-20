import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BattlePkmn } from 'src/app/dto/battle-pkmn';
import { BattleSimulatorService } from 'src/app/services/battle-simulator.service';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BattleComponent {

  ownPkmn!: BattlePkmn;
  enemyPkmn!: BattlePkmn;

  constructor(private battleSimulatorSrv: BattleSimulatorService) {}

  ngOnInit() {
    this.battleSimulatorSrv.ownPkmn$.subscribe(pkmn => {
      this.ownPkmn = pkmn;
    });

    this.battleSimulatorSrv.enemyPkmn$.subscribe(pkmn => {
      this.enemyPkmn = pkmn;
    });

    console.log(
      this.ownPkmn,
      this.enemyPkmn
    );

  }

}
