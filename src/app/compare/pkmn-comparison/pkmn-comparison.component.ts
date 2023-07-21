import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PkmnReferenceDTO } from 'src/app/dto/pkmn-referenceDTO';
import { PkmnToCompareDTO } from 'src/app/dto/pkmnToCompareDTO';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pkmn-comparison',
  templateUrl: './pkmn-comparison.component.html',
  styleUrls: ['./pkmn-comparison.component.scss']
})
export class PkmnComparisonComponent {

  pokedex: PkmnReferenceDTO[] = [];
  firstPokemon!: PkmnToCompareDTO;
  secondPokemon!: PkmnToCompareDTO;
  nameList: string[] = [];
  firstPkmnForm!: FormGroup;
  secondPkmnForm!: FormGroup;
  isFirstPkmnTypeStronger: boolean = false;
  isSecondPkmnTypeStronger: boolean = false;
  isFirstPkmnImmune: boolean = false;
  isSecondPkmnImmune: boolean = false;

  constructor(private pokedexSrv: PokedexService, private router: Router) { }

  ngOnInit() {
    if (this.pokedexSrv.nomePokemonToCompare) {
      this.firstPkmnForm = new FormGroup({
        nome: new FormControl(this.pokedexSrv.nomePokemonToCompare)
      });
    } else {
      this.firstPkmnForm = new FormGroup({
        nome: new FormControl('')
      });
    }
    this.secondPkmnForm = new FormGroup({
      nome: new FormControl('')
    })
    this.pokedexSrv.getAllPokemon().subscribe({
      next: res => {
        this.pokedex = res.results;
        this.pokedex.forEach(pkmn => {
          this.nameList.push(pkmn.name);
        })
      },
      error: err => console.error(err)
    })
    if (this.pokedexSrv.nomePokemonToCompare) {
      let pkmnName = this.pokedexSrv.nomePokemonToCompare;
      this.firstPkmnForm.value.name = this.pokedexSrv.nomePokemonToCompare;
      this.getFrstPkmnToCompare(pkmnName);
    }
  }

  getCompare(pkmn1: string, pkmn2: string) {
    this.getFrstPkmnToCompare(pkmn1);
    this.getScndPkmnToCompare(pkmn2);
  }

  getFrstPkmnToCompare(pknmName: string) {
    this.pokedexSrv.getPkmnToCompare(pknmName).subscribe({
      next: (res: any) => {
        this.firstPokemon = new PkmnToCompareDTO(
          res.name.charAt(0).toUpperCase() + res.name.slice(1),
          [res.types[0].type.name, res.types[1]?.type.name],
          res.stats[0].base_stat,
          res.stats[1].base_stat,
          res.stats[2].base_stat,
          res.stats[3].base_stat,
          res.stats[4].base_stat,
          res.stats[5].base_stat,
          res.sprites.front_default
        )
      },
      complete: () => this.compareType()
    })
  }

  getScndPkmnToCompare(pknmName: string) {
    this.pokedexSrv.getPkmnToCompare(pknmName).subscribe({
      next: (res: any) => {
        this.secondPokemon = new PkmnToCompareDTO(
          res.name.charAt(0).toUpperCase() + res.name.slice(1),
          [res.types[0].type.name, res.types[1]?.type.name],
          res.stats[0].base_stat,
          res.stats[1].base_stat,
          res.stats[2].base_stat,
          res.stats[3].base_stat,
          res.stats[4].base_stat,
          res.stats[5].base_stat,
          res.sprites.front_default
        )
      },
      complete: () => this.compareType()
    })
  }

  liveSearchFirstPkmn(keyboardInput: string) {
    this.liveSearch(keyboardInput);
  }

  liveSearchSecondPkmn(keyboardInput: string) {
    this.liveSearch(keyboardInput);
  }

  liveSearch(keyboardInput: string) {
    this.nameList = [];
    this.pokedex.filter(pkmn => {
      if (pkmn.name.toLowerCase().indexOf(keyboardInput.toLowerCase()) > -1) {
        this.nameList.push(pkmn.name);
      }
    })
  }

  compareType() {
    this.isFirstPkmnImmune = false;
    this.isSecondPkmnImmune = false;
    this.isFirstPkmnTypeStronger = false;
    this.isSecondPkmnTypeStronger = false;
    if (
      (this.firstPokemon.findRelations()[0].find(type => type === this.secondPokemon.types[0])) ||
      (this.firstPokemon.findRelations()[0].find(type => type === this.secondPokemon.types[1])) ||
      (this.firstPokemon.findRelations()[1].find(type => type === this.secondPokemon.types[0])) ||
      (this.firstPokemon.findRelations()[1].find(type => type === this.secondPokemon.types[1]))
    ) {
      this.isSecondPkmnTypeStronger = true;
    }
    if (
      (this.secondPokemon.findRelations()[0].find(type => type === this.firstPokemon.types[0])) ||
      (this.secondPokemon.findRelations()[0].find(type => type === this.firstPokemon.types[1])) ||
      (this.secondPokemon.findRelations()[1].find(type => type === this.firstPokemon.types[0])) ||
      (this.secondPokemon.findRelations()[1].find(type => type === this.firstPokemon.types[1]))
    ) {
      this.isFirstPkmnTypeStronger = true;
    }
    if (
      (this.firstPokemon.findRelations()[4].find(type => type === this.secondPokemon.types[0])) ||
      (this.firstPokemon.findRelations()[4].find(type => type === this.secondPokemon.types[1]))
    ) {
      this.isFirstPkmnImmune = true;
    }
    if (
      (this.secondPokemon.findRelations()[4].find(type => type === this.firstPokemon.types[0])) ||
      (this.secondPokemon.findRelations()[4].find(type => type === this.firstPokemon.types[1]))
    ) {
      this.isSecondPkmnImmune = true;
    }

  }

  goToDexCard(pkmnName: string) {
    this.pokedexSrv.nomePokemonToFind = pkmnName;
    this.router.navigateByUrl('/search');
  }


}
