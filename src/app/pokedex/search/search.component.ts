import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Ability } from 'src/app/dto/ability.interface';
import { PkmnReferenceDTO } from 'src/app/dto/pkmn-referenceDTO';
import { PkmnDTO } from 'src/app/dto/pkmnDTO';
import { LoadingFeedbackModalComponent } from 'src/app/loading-feedback-modal/loading-feedback-modal.component';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchbarForm!: FormGroup;
  pkmnFound!: PkmnDTO;
  pokedex: PkmnReferenceDTO[] = [];
  nameList: string[] = [];
  description!: string;
  sprite!: string;
  genus!: string;
  dexNum!: number;
  possibleAbilities: Ability[] = [];
  firstRes: any;

  constructor(private pokedexSrv: PokedexService, private dialog: MatDialog) { }

  ngOnInit() {
    const dialogRef = this.dialog.open(LoadingFeedbackModalComponent);
    this.searchbarForm = new FormGroup({
      nome: new FormControl('')
    })
    this.pokedexSrv.getAllPokemon().subscribe({
      next: res => {
        this.pokedex = res.results;
        this.pokedex.forEach(pkmn => {
          this.nameList.push(pkmn.name);
        })
      },
      error: err => {
        console.error(err);
        setTimeout(() => {
          dialogRef.close();
        }, 1000);
      },
      complete: () => {
        if (this.pokedexSrv.nomePokemonToFind) {
          this.search(this.pokedexSrv.nomePokemonToFind);
        }
        setTimeout(() => {
          dialogRef.close();
        }, 1000);
      }
    })
  }

  search(pkmnName: string) {
    const dialogRef = this.dialog.open(LoadingFeedbackModalComponent);
    this.possibleAbilities = [];
    let nome: string = pkmnName.toLowerCase();
    let pkmnRef: PkmnReferenceDTO;
    this.pokedex.filter(pokemon => {
      if (pokemon.name == nome) {
        pkmnRef = new PkmnReferenceDTO(pokemon.name, pokemon.url);
        this.pokedexSrv.getSinglePokemon(pkmnRef.url).subscribe({
          next: (res: any) => {
            this.firstRes = res;
            this.pokedexSrv.getDexDetails(this.firstRes.species.url).subscribe({
              next: (res: any) => {
                let secondRes = res;
                if (!secondRes.flavor_text_entries.find((description: any) => description.language.name == "it")) {
                  this.description = (secondRes.flavor_text_entries.find((description: any) => description.language.name == "en")).flavor_text;
                } else {
                  this.description = (secondRes.flavor_text_entries.find((description: any) => description.language.name == "it")).flavor_text;
                }
                if (this.firstRes.sprites.other.home.front_default) {
                  this.sprite = this.firstRes.sprites.other.home.front_default;
                } else {
                  this.sprite = this.firstRes.sprites.front_default
                }
                this.description = this.description?.replaceAll("\n", " ");
                this.description = this.description?.replaceAll("\u000c", " ");
                if (secondRes.genera.find((genere: any) => genere.language.name == "it")) {
                  this.genus = (secondRes.genera.find((genere: any) => genere.language.name == "it")).genus;
                } else {
                  this.genus = (secondRes.genera.find((genere: any) => genere.language.name == "en")).genus;
                }
                this.dexNum = (secondRes.pokedex_numbers.find((entry: any) => entry.pokedex.name == "national")).entry_number;
                this.firstRes.abilities.forEach((obj: any) => {
                  let name = obj.ability.name.charAt(0).toUpperCase() + obj.ability.name.slice(1);
                  let abilityDescription: string;
                  this.pokedexSrv.getAbility(obj.ability.url).subscribe({
                    next: (res: any) => {
                      if (res.flavor_text_entries.find((desc: any) => desc.language.name == "it")) {
                        abilityDescription = res.flavor_text_entries.find((desc: any) => desc.language.name == "it").flavor_text;
                      } else {
                        abilityDescription = 'Descrizione non disponibile';
                      }
                      let abilityFormat: Ability = {
                        name: name,
                        description: abilityDescription
                      }
                      this.possibleAbilities.push(abilityFormat);
                    }
                  })
                })
              },
              error: (err) => {
                console.error(err);
                setTimeout(() => {
                  dialogRef.close();
                }, 1000);
              },
              complete: () => {
                this.pkmnFound = new PkmnDTO(
                  this.dexNum,
                  this.firstRes.name.charAt(0).toUpperCase() + this.firstRes.name.slice(1),
                  this.sprite,
                  [this.firstRes.types[0].type.name, this.firstRes.types[1]?.type.name],
                  this.firstRes.stats[0].base_stat,
                  this.firstRes.stats[1].base_stat,
                  this.firstRes.stats[2].base_stat,
                  this.firstRes.stats[3].base_stat,
                  this.firstRes.stats[4].base_stat,
                  this.firstRes.stats[5].base_stat,
                  this.possibleAbilities,
                  this.description,
                  this.genus
                );
                setTimeout(() => {
                  dialogRef.close();
                }, 1000);
              }
            })
          },
          error: err => {
            console.error(err);
            setTimeout(() => {
              dialogRef.close();
            }, 1000);
          }
        })
      }
    })
  }

  liveSearch(keyboardInput: string) {
    this.nameList = [];
    this.pokedex.filter(pkmn => {
      if (pkmn.name.toLowerCase().indexOf(keyboardInput.toLowerCase()) > -1) {
        this.nameList.push(pkmn.name);
      }
    })
  }

}
