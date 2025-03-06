import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, type OnInit } from '@angular/core';
import { BattlePkmn } from 'src/app/dto/battle-pkmn';
import { BattleSimulatorService } from 'src/app/services/battle-simulator.service';

@Component({
  selector: 'app-demo-selection',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './demo-selection.component.html',
  styleUrls: ['./demo-selection.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoSelectionComponent {

  ownPkmn!: BattlePkmn;
  enemyPkmn!: BattlePkmn;
  @Input() pkmnToShow!: BattlePkmn;

  constructor(private battleSimulatorSrv: BattleSimulatorService) {}

  ngOnInit(): void {
    this.battleSimulatorSrv.ownPkmn$.subscribe(pkmn => {
      this.ownPkmn = pkmn;
    });
    this.battleSimulatorSrv.enemyPkmn$.subscribe(pkmn => {
      this.enemyPkmn = pkmn;
    });
  }

}
