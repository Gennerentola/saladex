import { Move } from "./move.interface";

export class BattlePkmn {

  name: string;
  sprite: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  };
  abilities: string[];
  moves?: Move[];

  constructor(
    _name: string,
    _sprite: string,
    _types: string[],
    _hp: number,
    _attack: number,
    _defense: number,
    _spAttack: number,
    _spDefense: number,
    _speed: number,
    _abilities: string[],
    _moves: Move[]
  ) {
    this.name = _name;
    this.sprite = _sprite;
    this.types = _types;
    this.stats = {
      hp: _hp,
      attack: _attack,
      defense: _defense,
      spAttack: _spAttack,
      spDefense: _spDefense,
      speed: _speed
    };
    this.abilities = _abilities;
    this.moves = _moves;
  }

  findRelations(): string[][] {

    let weaknesses: string[] = [];
    let resistances: string[] = [];
    let immunities: string[] = [];

    if (this.types[0] == "normal" || this.types[1] == "normal") {
      weaknesses.push("fight");
      immunities.push("ghost");
    }
    if (this.types[0] == "fire" || this.types[1] == "fire") {
      weaknesses.push("ground");
      weaknesses.push("rock");
      weaknesses.push("water");
      resistances.push("bug");
      resistances.push("steel");
      resistances.push("fire");
      resistances.push("grass");
      resistances.push("ice");
      resistances.push("fairy");
    }
    if (this.types[0] == "fighting" || this.types[1] == "fighting") {
      weaknesses.push("flying");
      weaknesses.push("psychic");
      weaknesses.push("fairy");
      resistances.push("rock");
      resistances.push("bug");
      resistances.push("dark");
    }
    if (this.types[0] == "water" || this.types[1] == "water") {
      weaknesses.push("grass");
      weaknesses.push("electric");
      resistances.push("steel");
      resistances.push("fire");
      resistances.push("water");
      resistances.push("ice");
    }
    if (this.types[0] == "flying" || this.types[1] == "flying") {
      weaknesses.push("rock");
      weaknesses.push("electric");
      weaknesses.push("ice");
      resistances.push("fight");
      resistances.push("bug");
      resistances.push("grass");
      immunities.push("ground");
    }
    if (this.types[0] == "grass" || this.types[1] == "grass") {
      weaknesses.push("flying");
      weaknesses.push("poison");
      weaknesses.push("fire");
      weaknesses.push("ice");
      weaknesses.push("bug");
      resistances.push("ground");
      resistances.push("water");
      resistances.push("grass");
      resistances.push("electric")
    }
    if (this.types[0] == "poison" || this.types[1] == "poison") {
      weaknesses.push("ground");
      weaknesses.push("psychic");
      resistances.push("fight");
      resistances.push("poison");
      resistances.push("bug");
      resistances.push("grass");
      resistances.push("fairy");
    }
    if (this.types[0] == "electric" || this.types[1] == "electric") {
      weaknesses.push("ground");
      resistances.push("flying");
      resistances.push("steel");
      resistances.push("electric");

    }
    if (this.types[0] == "ground" || this.types[1] == "ground") {
      weaknesses.push("water");
      weaknesses.push("grass");
      weaknesses.push("ice");
      resistances.push("rock");
      resistances.push("poison");
      immunities.push("electric");
    }
    if (this.types[0] == "psychic" || this.types[1] == "psychic") {
      weaknesses.push("ghost");
      weaknesses.push("bug");
      weaknesses.push("dark");
      resistances.push("fight");
      resistances.push("psychic");
    }
    if (this.types[0] == "rock" || this.types[1] == "rock") {
      weaknesses.push("ground");
      weaknesses.push("fight");
      weaknesses.push("water");
      weaknesses.push("steel");
      weaknesses.push("grass");
      resistances.push("normal");
      resistances.push("poison");
      resistances.push("flying");
      resistances.push("fire");
    }
    if (this.types[0] == "ice" || this.types[1] == "ice") {
      weaknesses.push("rock");
      weaknesses.push("steel");
      weaknesses.push("fight");
      weaknesses.push("fire");
      resistances.push("ice");
    }
    if (this.types[0] == "bug" || this.types[1] == "bug") {
      weaknesses.push("flying");
      weaknesses.push("rock");
      weaknesses.push("fire");
      resistances.push("fight");
      resistances.push("ground");
      resistances.push("grass");
    }
    if (this.types[0] == "dragon" || this.types[1] == "dragon") {
      weaknesses.push("ice");
      weaknesses.push("dragon");
      weaknesses.push("fairy");
      resistances.push("fire");
      resistances.push("water");
      resistances.push("grass");
      resistances.push("electric");
    }
    if (this.types[0] == "ghost" || this.types[1] == "ghost") {
      weaknesses.push("ghost");
      weaknesses.push("dark");
      resistances.push("bug");
      resistances.push("poison");
      immunities.push("fight");
      immunities.push("normal");
    }
    if (this.types[0] == "dark" || this.types[1] == "dark") {
      weaknesses.push("fight");
      weaknesses.push("bug");
      weaknesses.push("fairy");
      resistances.push("ghost");
      resistances.push("dark");
      immunities.push("psychic");
    }
    if (this.types[0] == "steel" || this.types[1] == "steel") {
      weaknesses.push("ground");
      weaknesses.push("fire");
      weaknesses.push("fight");
      resistances.push("normal");
      resistances.push("flying");
      resistances.push("rock");
      resistances.push("bug");
      resistances.push("steel");
      resistances.push("grass");
      resistances.push("psychic");
      resistances.push("ice");
      resistances.push("dragon");
      resistances.push("fairy");
      immunities.push("poison");
    }
    if (this.types[0] == "fairy" || this.types[1] == "fairy") {
      weaknesses.push("poison");
      weaknesses.push("steel");
      resistances.push("fight");
      resistances.push("dark");
      resistances.push("bug");
      immunities.push("dragon");
    }

    let findComboRelations = (arry: string[]) => arry.filter((item, index) => arry.indexOf(item) !== index)

    let weaknessesx4 = findComboRelations(weaknesses);
    weaknesses = [... new Set(weaknesses)];
    weaknesses = this.findUncommon(weaknesses, weaknessesx4);
    let resistancesx4 = findComboRelations(resistances);
    resistances = [... new Set(resistances)];
    resistances = this.findUncommon(resistances, resistancesx4);
    immunities = [... new Set(immunities)];
    let filtredResistances = resistances.filter(type => !weaknesses.includes(type));
    let filtredWeaknesses = weaknesses.filter(type => !resistances.includes(type));
    filtredResistances = filtredResistances.filter(type => !immunities.includes(type));
    filtredWeaknesses = filtredWeaknesses.filter(type => !immunities.includes(type));

    return [weaknessesx4, filtredWeaknesses, filtredResistances, resistancesx4, immunities];
  }

  private findUncommon(arr1: string[], arr2: string[]): string[] {
    let res: string[] = [];
    arr1.forEach(str1 => {
      if (arr2.indexOf(str1) == -1) {
        res.push(str1);
      }
    })
    arr2.forEach(str2 => {
      if (arr1.indexOf(str2) == -1) {
        res.push(str2);
      }
    })
    return res;
  }
}
