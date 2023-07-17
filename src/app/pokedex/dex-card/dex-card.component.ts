import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Ability } from 'src/app/dto/ability.interface';
import { PkmnDTO } from 'src/app/dto/pkmnDTO';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-dex-card',
  templateUrl: './dex-card.component.html',
  styleUrls: ['./dex-card.component.scss']
})
export class DexCardComponent {

  @Input() pokemon!: PkmnDTO;
  loading: boolean = false;
  description!: string;
  sprite!: string;
  genus!: string;
  dexNum!: number;
  possibleAbilities: Ability[] = [];
  firstRes: any;
  panelOpenState: boolean = false;

  constructor(private pokedexSrv: PokedexService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon']) {
      this.pokemon = changes['pokemon'].currentValue;
    }
  }

  nextSearch(dexNumb: number) {
    this.possibleAbilities = [];
    this.pokedexSrv.getPokemonByDexNumber(dexNumb).subscribe({
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
            console.log(this.description);
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
                next: (res:any) => {
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
          error: err => console.error(err),
          complete: () => {
            this.pokemon = new PkmnDTO(
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
          }
        })
      },
      error: err => console.error(err)
    })
  }

  compare(nomePokemon: string) {
    this.pokedexSrv.nomePokemonToCompare = nomePokemon.toLowerCase();
    this.router.navigateByUrl('/pokemon-comparison');
  }

}
