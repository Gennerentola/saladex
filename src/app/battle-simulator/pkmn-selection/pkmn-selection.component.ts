import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BattlePkmn } from 'src/app/dto/battle-pkmn';
import { PkmnPreview } from 'src/app/dto/pkmn-preview';
import { PkmnReferenceDTO } from 'src/app/dto/pkmn-referenceDTO';
import { LoadingFeedbackModalComponent } from 'src/app/loading-feedback-modal/loading-feedback-modal.component';
import { PokedexService } from 'src/app/services/pokedex.service';
import { PreviewCardComponent } from '../preview-card/preview-card.component';
import { BattleSimulatorService } from 'src/app/services/battle-simulator.service';

@Component({
  selector: 'app-pkmn-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    PreviewCardComponent
  ],
  templateUrl: './pkmn-selection.component.html',
  styleUrls: ['./pkmn-selection.component.scss'],
})
export class PkmnSelectionComponent {

  searchbarForm!: FormGroup;
  pokedex: PkmnReferenceDTO[] = [];
  pokeList: PkmnReferenceDTO[] = [];
  pkmnPreview!: PkmnPreview;
  ownPkmn!: BattlePkmn;
  enemyPkmn!: BattlePkmn;
  response: any;

  constructor(private pokedexSrv: PokedexService, private dialog: MatDialog, private battleSimulatorSrv: BattleSimulatorService) {}

  ngOnInit() {
    const dialogRef = this.dialog.open(LoadingFeedbackModalComponent);

    this.battleSimulatorSrv.ownPkmn$.subscribe(pkmn => {
      this.ownPkmn = pkmn;
    });

    this.battleSimulatorSrv.enemyPkmn$.subscribe(pkmn => {
      this.enemyPkmn = pkmn;
    });

    this.searchbarForm = new FormGroup({
      nome: new FormControl('')
    })
    this.pokedexSrv.getAllPokemon().subscribe({
      next: res => {
        this.pokedex = res.results;
        this.pokeList = res.results;
      },
      error: err => {
        console.error(err);
        dialogRef.close();
      },
      complete: () => dialogRef.close()
    })
  }

  liveSearch(keyboardInput: string) {
    this.pokeList = [];
    this.pokedex.filter(pkmn => {
      if (pkmn.name.toLowerCase().indexOf(keyboardInput.toLowerCase()) > -1) {
        this.pokeList.push(pkmn);
      }
    })
  }

  searchPkmn(url: string) {
    const dialogRef = this.dialog.open(LoadingFeedbackModalComponent);
    this.pokedexSrv.getSinglePokemon(url).subscribe({
      next: (res: any) => {
        this.response = res;
      },
      error: () => dialogRef.close(),
      complete: () => {
        let pkmnTypes: any[] = [];
        let pkmnAbilities: any[] = [];
        let pkmnMoves: any[] = [];
        this.response.types.forEach((type: any) => {
          pkmnTypes.push(type.type.name);
        });
        this.response.abilities.forEach((ability: any) => {
          pkmnAbilities.push(ability.ability.name);
        });
        this.response.moves.forEach((e: any) => {
          pkmnMoves.push(e.move);
        })
        this.pkmnPreview = new PkmnPreview(
          this.response.name,
          pkmnTypes,
          this.response.stats[0].base_stat,
          this.response.stats[1].base_stat,
          this.response.stats[2].base_stat,
          this.response.stats[3].base_stat,
          this.response.stats[4].base_stat,
          this.response.stats[5].base_stat,
          this.response.sprites.other.home.front_default,
          this.battleSimulatorSrv.ownPkmn.value.name != '' ? (this.response.sprites.other.showdown.front_default ? this.response.sprites.other.showdown.front_default : this.pkmnPreview.sprites.previewSprite) : (this.response.sprites.other.showdown.back_default ? this.response.sprites.other.showdown.back_default : this.pkmnPreview.sprites.previewSprite),
          pkmnAbilities,
          pkmnMoves
        );
        dialogRef.close();
      }
    })
  }

  clearChoosenPkmn() {
    this.battleSimulatorSrv.setOwnPkmn(this.battleSimulatorSrv.emptyPkmnValue);
    this.battleSimulatorSrv.setEnemyPkmn(this.battleSimulatorSrv.emptyPkmnValue);
  }

}
