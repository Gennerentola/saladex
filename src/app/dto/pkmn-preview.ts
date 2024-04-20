import { MoveReferenceDTO } from "./move.interface"

export class PkmnPreview {
  name: string;
  types: string[];
  baseStats: {
    hp: number,
    attack: number,
    defense: number,
    spAttack: number,
    spDefense: number,
    speed: number,
  };
  sprites: {
    previewSprite: string,
    battleSprite: string
  };
  abilities: string[];
  moves: MoveReferenceDTO[];

  constructor(
    _name: string,
    _types: string[],
    _hp: number,
    _attack: number,
    _defense: number,
    _spAttack: number,
    _spDefense: number,
    _speed: number,
    _previewSprite: string,
    _battleSprite: string,
    _abilities: string[],
    _moves: MoveReferenceDTO[],
  ) {
    this.name = _name;
    this.types = _types;
    this.baseStats = {
      hp: _hp,
      attack: _attack,
      defense: _defense,
      spAttack: _spAttack,
      spDefense: _spDefense,
      speed: _speed,
    };
    this.sprites = {
      previewSprite: _previewSprite,
      battleSprite: _battleSprite
    },
    this.abilities = _abilities;
    this.moves = _moves;

  }
}
