import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BattlePkmn } from 'src/app/dto/battle-pkmn';
import { Move } from 'src/app/dto/move.interface';
import { BattleSimulatorService } from 'src/app/services/battle-simulator.service';
import { EnemyAttackAnimation, YourAttackAnimation } from 'src/assets/animations';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    YourAttackAnimation,
    EnemyAttackAnimation
  ]
})
export class BattleComponent {
  yourAttackState = 'default';
  enemyAttackState = 'default';
  ownPkmn!: BattlePkmn;
  enemyPkmn!: BattlePkmn;
  ownPkmnStartingHp: number = 0;
  enemyPkmnStartingHp: number = 0;
  imgAssetsPath: string = '../../../assets/img/';
  imgExtension: string = '.png';
  @ViewChild('battleLogRef', { static: false }) battleLog!: ElementRef;
  turnOrder: any;
  pendingMove: any;
  moveType: string = '';
  turn: number = 0;
  isTurnPlaying: boolean = false;

  constructor(private battleSimulatorSrv: BattleSimulatorService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.battleSimulatorSrv.ownPkmn$.subscribe(pkmn => {
      this.ownPkmn = new BattlePkmn(
        pkmn.name,
        pkmn.sprite,
        pkmn.types,
        Math.floor(pkmn.stats.hp + 0.5 * 31 + 60),
        Math.floor(pkmn.stats.attack + 0.5 * 31 + 5),
        Math.floor(pkmn.stats.defense + 0.5 * 31 + 5),
        Math.floor(pkmn.stats.spAttack + 0.5 * 31 + 5),
        Math.floor(pkmn.stats.spDefense + 0.5 * 31 + 5),
        Math.floor(pkmn.stats.speed + 0.5 * 31 + 5),
        pkmn.abilities,
        pkmn.moves,
        pkmn.enemySprite,
        pkmn.previewSprite
      )
    });

    this.battleSimulatorSrv.enemyPkmn$.subscribe(pkmn => {
      this.enemyPkmn = new BattlePkmn(
        pkmn.name,
        pkmn.sprite,
        pkmn.types,
        Math.floor(pkmn.stats.hp + 0.5 * 31 + 60),
        Math.floor(pkmn.stats.attack + 0.5 * 31 + 5),
        Math.floor(pkmn.stats.defense + 0.5 * 31 + 5),
        Math.floor(pkmn.stats.spAttack + 0.5 * 31 + 5),
        Math.floor(pkmn.stats.spDefense + 0.5 * 31 + 5),
        Math.floor(pkmn.stats.speed + 0.5 * 31 + 5),
        pkmn.abilities,
        pkmn.moves,
        pkmn.enemySprite,
        pkmn.previewSprite
      )
    });

    this.ownPkmnStartingHp = this.ownPkmn.stats.hp;
    this.enemyPkmnStartingHp = this.enemyPkmn.stats.hp;

    if (this.ownPkmn.name == '' || this.enemyPkmn.name == '') {
      this.router.navigate(['/pkmn-selection']);
    }

  }

  playTurn(move: Move) {
    this.isTurnPlaying = true;
    this.turn++
    let turnCounter = document.createElement('p');
    turnCounter.classList.add('fw-bold');
    turnCounter.innerText = `Turno ${this.turn}`;
    this.battleLog.nativeElement.appendChild(turnCounter);
    let enemyMoveIndex = Math.floor(Math.random() * this.enemyPkmn.moves.length);
    let dmgDone = this.calculateDamage(move, this.ownPkmn, this.enemyPkmn);
    let dmgReceived = this.calculateDamage(this.enemyPkmn.moves[enemyMoveIndex], this.enemyPkmn, this.ownPkmn);
    if (this.ownPkmn.stats.speed > this.enemyPkmn.stats.speed) {
      this.fasterPkmn(dmgDone, dmgReceived, move, this.enemyPkmn.moves[enemyMoveIndex]);
    } else if (this.ownPkmn.stats.speed < this.enemyPkmn.stats.speed) {
      this.slowerPkmn(dmgDone, dmgReceived, move, this.enemyPkmn.moves[enemyMoveIndex]);
    } else {
      Math.random() < 0.5 ? this.fasterPkmn(dmgDone, dmgReceived, move, this.enemyPkmn.moves[enemyMoveIndex]) : this.slowerPkmn(dmgDone, dmgReceived, move, this.enemyPkmn.moves[enemyMoveIndex])
    }
  }

  fasterPkmn(dmgDone: number, dmgReceived: number, yourMove: Move, enemyMove: Move) {
    this.turnOrder = 'faster';
    this.pendingMove = { dmgDone, dmgReceived, yourMove, enemyMove };
    this.moveType = yourMove.type;
    this.yourAttackState = 'start'; // Inizia l'animazione dell'attacco
  }

  slowerPkmn(dmgDone: number, dmgReceived: number, yourMove: Move, enemyMove: Move) {
    this.turnOrder = 'slower';
    this.pendingMove = { dmgDone, dmgReceived, yourMove, enemyMove };
    this.moveType = enemyMove.type;
    this.enemyAttackState = 'start'; // Inizia l'attacco nemico per primo
  }

  calculateDamage(move: Move, attackingPkmn: BattlePkmn, defendingPkmn: BattlePkmn): number {
    let attackerLevel: number = 50;
    let power: number = move.power;
    let attackingStat: number = (move.damageClass === 'physical') ? attackingPkmn.stats.attack : attackingPkmn.stats.spAttack;
    let defendingStat: number = (move.damageClass === 'physical') ? defendingPkmn.stats.defense : defendingPkmn.stats.spDefense;
    let stab: number = (attackingPkmn.types.includes(move.type)) ? 1.5 : 1;
    let effectiveness: number = 1;
    if (defendingPkmn.findRelations()[0].includes(move.type)) effectiveness = 4;
    if (defendingPkmn.findRelations()[1].includes(move.type)) effectiveness = 2;
    if (defendingPkmn.findRelations()[2].includes(move.type)) effectiveness = 0.5;
    if (defendingPkmn.findRelations()[3].includes(move.type)) effectiveness = 0.25;
    if (defendingPkmn.findRelations()[4].includes(move.type)) effectiveness = 0;
    let rng: number = parseFloat((0.85 + Math.random() * 0.15).toFixed(2));
    let dmg: number = ((((((2 * attackerLevel) / 5) + 2) * power * (attackingStat / defendingStat)) / 50) + 2) * stab * effectiveness * rng;
    if (effectiveness != 0 && dmg < 1) {
      return 1;
    } else {
      return Math.floor(dmg);
    }
  }

  resetGame() {
    this.turn = 0;
    this.ownPkmn.stats.hp = this.ownPkmnStartingHp;
    this.enemyPkmn.stats.hp = this.enemyPkmnStartingHp;
    while (this.battleLog.nativeElement.firstChild) {
      this.battleLog.nativeElement.removeChild(this.battleLog.nativeElement.firstChild);
    }
    this.cdr.detectChanges();
  }

  calculateHp(pkmn: string) {
    if (pkmn == 'YOU') {
      return `${(100 * this.ownPkmn.stats.hp / this.ownPkmnStartingHp)}%`
    } else {
      return `${(100 * this.enemyPkmn.stats.hp / this.enemyPkmnStartingHp)}%`
    }
  }

  onYourAttackAnimationDone(event: any) {
    if (event.toState === 'start') {
      this.yourAttackState = 'middle';
    } else if (event.toState === 'middle') {
      this.yourAttackState = 'end';
    } else if (event.toState === 'end') {
      this.yourAttackState = 'default';

      const { dmgDone, yourMove, enemyMove } = this.pendingMove;
      let ownMoveLog = document.createElement('p');
      this.enemyPkmn.stats.hp -= dmgDone;
      ownMoveLog.innerText = `${this.ownPkmn.name} ha usato ${yourMove.name}, ${this.enemyPkmn.name} nemico ha perso ${dmgDone} HP!`;
      this.battleLog.nativeElement.appendChild(ownMoveLog);

      if (this.enemyPkmn.stats.hp <= 0) {
        this.isTurnPlaying = false;
        this.enemyPkmn.stats.hp = 0;
        Swal.fire({
          title: "Hai vinto!",
          text: "Cosa vuoi fare?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#00A0B6",
          cancelButtonColor: "#BA004F",
          confirmButtonText: "Rigioca",
          cancelButtonText: "Vai alla scelta dei Pokémon",
        }).then((result) => {
          if (result.isConfirmed) {
            this.resetGame()
          } else {
            this.router.navigate(['/pkmn-selection']);
          }
        });
      } else if (this.turnOrder === 'faster') {
        this.moveType = enemyMove.type;
        this.enemyAttackState = 'start';
      } else {
        this.isTurnPlaying = false;
      }
    }
  }

  onEnemyAttackAnimationDone(event: any) {
    if (event.toState === 'start') {
      this.enemyAttackState = 'middle';
    } else if (event.toState === 'middle') {
      this.enemyAttackState = 'end';
    } else if (event.toState === 'end') {
      this.enemyAttackState = 'default';

      const { dmgReceived, yourMove, enemyMove } = this.pendingMove;
      let enemyMoveLog = document.createElement('p');
      this.ownPkmn.stats.hp -= dmgReceived;
      enemyMoveLog.innerText = `${this.enemyPkmn.name} nemico ha usato ${enemyMove.name}, ${this.ownPkmn.name} ha perso ${dmgReceived} HP!`;
      this.battleLog.nativeElement.appendChild(enemyMoveLog);

      if (this.ownPkmn.stats.hp <= 0) {
        this.isTurnPlaying = false;
        this.ownPkmn.stats.hp = 0;
        Swal.fire({
          title: "Hai perso...",
          text: "Cosa vuoi fare?",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#00A0B6",
          cancelButtonColor: "#BA004F",
          confirmButtonText: "Rigioca",
          cancelButtonText: "Vai alla scelta dei Pokémon",
        }).then((result) => {
          if (result.isConfirmed) {
            this.resetGame()
          } else {
            this.router.navigate(['/pkmn-selection']);
          }
        });
      } else if (this.turnOrder === 'slower') {
        this.moveType = yourMove.type;
        this.yourAttackState = 'start';
      } else {
        this.isTurnPlaying = false;
      }
    }
  }

  ngOnDestroy() {
    this.battleSimulatorSrv.setOwnPkmn(this.battleSimulatorSrv.emptyPkmnValue);
    this.battleSimulatorSrv.setEnemyPkmn(this.battleSimulatorSrv.emptyPkmnValue);
    this.battleSimulatorSrv.ownPkmn$.subscribe().unsubscribe();
    this.battleSimulatorSrv.enemyPkmn$.subscribe().unsubscribe();
  }

}
