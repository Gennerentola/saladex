import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { PreviewChartComponent } from '../preview-chart/preview-chart.component';
import { Move, MoveReferenceDTO } from 'src/app/dto/move.interface';
import { BattleSimulatorService } from 'src/app/services/battle-simulator.service';
import { LoadingFeedbackModalComponent } from 'src/app/loading-feedback-modal/loading-feedback-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { BattlePkmn } from 'src/app/dto/battle-pkmn';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preview-card',
  standalone: true,
  imports: [
    CommonModule,
    PreviewChartComponent
  ],
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss'],
})
export class PreviewCardComponent {

  @Input() pokemon?: any;
  movesPreview: Move[] = [];
  choosenMovesNames: string[] = [];
  imgAssetsPath: string = '../../../assets/img/';
  imgExtension: string = '.png';
  ownPkmn!: BattlePkmn;
  enemyPkmn!: BattlePkmn;

  constructor(
    private battleSimulatorSrv: BattleSimulatorService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.battleSimulatorSrv.ownPkmn$.subscribe(pkmn => {
      this.ownPkmn = pkmn;
    });
    this.battleSimulatorSrv.enemyPkmn$.subscribe(pkmn => {
      this.enemyPkmn = pkmn;
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon']) {
      this.movesPreview = [];
      this.pokemon = changes['pokemon'].currentValue;
    }
  }

  pickMove(move: MoveReferenceDTO) {
    const dialogRef = this.dialog.open(LoadingFeedbackModalComponent);

    if (this.choosenMovesNames.includes(move.name)) {
      this.choosenMovesNames.splice(this.choosenMovesNames.indexOf(move.name), 1);
      let indexToSplice = this.movesPreview.findIndex(obj => obj.name.replace('-', ' ') == move.name.replace('-', ' '));
      this.movesPreview.splice(indexToSplice, 1);
      dialogRef.close();
    } else {
      this.battleSimulatorSrv.getMove(move.url).subscribe({
        next: (res: any) => {
          if (res.damage_class.name == 'status') {
            Swal.fire({
              title: "Non è ancora possibile utilizzare mosse di stato",
              text: "Seleziona un\' altra mossa!",
              icon: "error",
              showCancelButton: false,
              confirmButtonColor: "#00A0B6",
              confirmButtonText: "OK",
            })
          } else {
            let moveToAdd: Move = {
              name: res.name.replace('-', ' '),
              power: res.power,
              type: res.type.name,
              damageClass: res.damage_class.name,
              statChanges: res.stat_changes,
              priority: res.priority,
              minHits: res.meta ? res.meta.min_hits : null,
              maxHits: res.meta ? res.meta.max_hits : null,
              drain: res.meta ? res.meta.drain : null,
              effectChance: res.effect_chance,
              effectDescription: res.effect_entries[0] ? res.effect_entries[0].short_effect : null
            };
            if (this.movesPreview.length == 4) {
              this.movesPreview.pop();
              this.choosenMovesNames.pop();
            }
            this.choosenMovesNames.push(move.name);
            this.movesPreview.push(moveToAdd);
          }
        },
        error: () => dialogRef.close(),
        complete: () => dialogRef.close()
      })
    }
  }

  deleteMove(moveName: string) {
    const dialogRef = this.dialog.open(LoadingFeedbackModalComponent);
    this.choosenMovesNames.splice(this.choosenMovesNames.indexOf(moveName), 1);
    let indexToSplice = this.movesPreview.findIndex(obj => obj.name.replace('-', ' ') == moveName.replace('-', ' '));
    this.movesPreview.splice(indexToSplice, 1);
    dialogRef.close();
  }

  savePokemon() {
    if (this.movesPreview.length > 0) {
      if (this.pokemon) {
        let readyPkmn = new BattlePkmn(
          this.pokemon.name,
          this.pokemon.sprites.battleSprite,
          this.pokemon.types,
          this.pokemon.baseStats.hp,
          this.pokemon.baseStats.attack,
          this.pokemon.baseStats.defense,
          this.pokemon.baseStats.spAttack,
          this.pokemon.baseStats.spDefense,
          this.pokemon.baseStats.speed,
          this.pokemon.abilities,
          this.movesPreview,
          this.pokemon.sprites.enemySprite,
          this.pokemon.sprites.previewSprite
        );
        if (this.battleSimulatorSrv.ownPkmn.value.name == '') {
          console.log(JSON.stringify(readyPkmn, null, 2));
          this.battleSimulatorSrv.setOwnPkmn(readyPkmn)
          this.pokemon = new BattlePkmn(
            '',
            '',
            [],
            0,
            0,
            0,
            0,
            0,
            0,
            [],
            [],
            '',
            ''
          )
          this.choosenMovesNames = [];
          this.movesPreview = [];
        } else {
          this.battleSimulatorSrv.setEnemyPkmn(readyPkmn);
        }
      }
    } else {
      Swal.fire({
        title: "Seleziona almeno una mossa per continuare",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#00A0B6",
        confirmButtonText: "OK",
      })
    }
  }

  goToBattle() {
    this.router.navigate(['/battle']);
  }

  ngOnDestroy() {
    this.battleSimulatorSrv.ownPkmn$.subscribe().unsubscribe();
    this.battleSimulatorSrv.enemyPkmn$.subscribe().unsubscribe();
  }
}
