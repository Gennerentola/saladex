import { BattlePkmn } from "src/app/dto/battle-pkmn";

const demoPkmn = [
  {
    name: "Venusaur",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/3.gif",
    types: [
      "grass",
      "poison"
    ],
    stats: {
      hp: 80,
      attack: 82,
      defense: 83,
      spAttack: 100,
      spDefense: 100,
      speed: 80
    },
    abilities: [
      "overgrow",
      "clorophyll"
    ],
    moves: [
      {
        name: "energipalla",
        power: 90,
        type: "grass",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to lower the target's Special Defense by one stage."
      },
      {
        name: "fangobomba",
        power: 90,
        type: "poison",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 30,
        effectDescription: "Has a 30% chance to poison the target."
      },
      {
        name: "geoforza",
        power: 90,
        type: "ground",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to lower the target's Special Defense by one stage."
      },
      {
        name: "vigorcolpo",
        power: 120,
        type: "grass",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Inflicts regular damage with no additional effect."
      }
    ],
    enemySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/3.gif",
    previewSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
  },
  {
    name: "Charizard",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/6.gif",
    types: [
      "fire",
      "flying"
    ],
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
      spAttack: 109,
      spDefense: 85,
      speed: 100
    },
    abilities: [
      "blaze",
      "solar-power"
    ],
    moves: [
      {
        name: "lanciafiamme",
        power: 90,
        type: "fire",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to burn the target."
      },
      {
        name: "tifone",
        power: 110,
        type: "flying",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 30,
        effectDescription: "Has a 30% chance to confuse the target. Can't miss in rain."
      },
      {
        name: "sabbiardente",
        power: 70,
        type: "ground",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 30,
        effectDescription: "Has a 30% chance to burn the target. Thaws target."
      },
      {
        name: "dragopulsar",
        power: 85,
        type: "dragon",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Inflicts regular damage with no additional effect."
      }
    ],
    enemySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/6.gif",
    previewSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
  },
  {
    name: "Blastoise",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/9.gif",
    types: [
      "water"
    ],
    stats: {
      hp: 79,
      attack: 83,
      defense: 100,
      spAttack: 85,
      spDefense: 105,
      speed: 78
    },
    abilities: [
      "torrent",
      "rain-dish"
    ],
    moves: [
      {
        name: "idrondata",
        power: 90,
        type: "water",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Inflicts regular damage with no additional effect."
      },
      {
        name: "surf",
        power: 90,
        type: "water",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Inflicts regular damage with no additional effect."
      },
      {
        name: "vortighiaccio",
        power: 80,
        type: "ice",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Inflicts regular damage with no additional effect."
      },
      {
        name: "bora",
        power: 110,
        type: "ice",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to freeze the target."
      }
    ],
    enemySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/9.gif",
    previewSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"
  },
  {
    name: "Salamence",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/373.gif",
    types: [
      "dragon",
      "flying"
    ],
    stats: {
      hp: 95,
      attack: 135,
      defense: 80,
      spAttack: 110,
      spDefense: 80,
      speed: 100
    },
    abilities: [
      "intimidate",
      "moxie"
    ],
    moves: [
      {
        name: "volo",
        power: 90,
        type: "flying",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "User flies high into the air, dodging all attacks, and hits next turn."
      },
      {
        name: "dragartigli",
        power: 90,
        type: "dragon",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "No addictional effect."
      },
      {
        name: "terremoto",
        power: 100,
        type: "ground",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        "effectDescription": "Inflicts regular damage and can hit Dig users."
      },
      {
        name: "codacciaio",
        power: 100,
        type: "steel",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 30,
        effectDescription: "Has a 30% chance to lower the target's Defense by one stage."
      }
    ],
    enemySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/373.gif",
    previewSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/373.png"
  },
  {
    name: "Gliscor",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/472.gif",
    types: [
      "ground",
      "flying"
    ],
    stats: {
      hp: 75,
      attack: 95,
      defense: 125,
      spAttack: 45,
      spDefense: 75,
      speed: 95
    },
    abilities: [
      "hyper-cutter",
      "sand-veil",
      "poison-heal"
    ],
    moves: [
      {
        name: "terremoto",
        power: 100,
        type: "ground",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Inflicts regular damage and can hit Dig users."
      },
      {
        name: "attacco d'ala",
        power: 60,
        type: "flying",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Inflicts regular damage with no additional effect."
      },
      {
        name: "velenpuntura",
        power: 80,
        type: "poison",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 30,
        effectDescription: "Has a 30% chance to poison the target."
      },
      {
        name: "nottesferza",
        power: 70,
        type: "dark",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Has an increased chance for a critical hit."
      }
    ],
    enemySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/472.gif",
    previewSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/472.png"
  },
  {
    name: "Gengar",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/94.gif",
    types: [
      "ghost",
      "poison"
    ],
    stats: {
      hp: 60,
      attack: 65,
      defense: 60,
      spAttack: 130,
      spDefense: 75,
      speed: 110
    },
    abilities: [
      "cursed-body"
    ],
    moves: [
      {
        name: "palla ombra",
        power: 80,
        type: "ghost",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 20,
        effectDescription: "Has a 20% chance to lower the target's Special Defense by one stage."
      },
      {
        name: "fangobomba",
        power: 90,
        type: "poison",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 30,
        effectDescription: "Has a 30% chance to poison the target."
      },
      {
        name: "magibrillio",
        power: 80,
        type: "fairy",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Inflicts regular damage with no additional effect."
      },
      {
        name: "psichico",
        power: 90,
        type: "psychic",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to lower the target's Special Defense by one stage."
      }
    ],
    enemySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/94.gif",
    previewSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
  },
  {
    name: "Lucario",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/448.gif",
    types: [
      "fighting",
      "steel"
    ],
    stats: {
      hp: 70,
      attack: 110,
      defense: 70,
      spAttack: 115,
      spDefense: 70,
      speed: 90
    },
    abilities: [
      "steadfast",
      "inner-focus",
      "justified"
    ],
    moves: [
      {
        name: "focalcolpo",
        power: 120,
        type: "fighting",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to lower the target's Special Defense by one stage."
      },
      {
        name: "cannonflash",
        power: 80,
        type: "steel",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to lower the target's Special Defense by one stage."
      },
      {
        name: "psichico",
        power: 90,
        type: "psychic",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to lower the target's Special Defense by one stage."
      },
      {
        name: "dragopulsar",
        power: 85,
        type: "dragon",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "Inflicts regular damage with no additional effect."
      }
    ],
    enemySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/448.gif",
    previewSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png"
  },
  {
    name: "Sylveon",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/700.gif",
    types: [
      "fairy"
    ],
    stats: {
      hp: 95,
      attack: 65,
      defense: 65,
      spAttack: 110,
      spDefense: 130,
      speed: 60
    },
    abilities: [
      "cute-charm",
      "pixilate"
    ],
    moves: [
      {
        name: "forza lunare",
        power: 95,
        type: "fairy",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 30,
        effectDescription: "Has a 30% chance to lower the target's Special Attack by one stage."
      },
      {
        name: "psichico",
        power: 90,
        type: "psychic",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 30% chance to lower the target's Special Defense by one stage."
      },
      {
        name: "fogliamagica",
        power: 60,
        type: "grass",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: null,
        effectDescription: "This move does not check accuracy."
      },
      {
        name: "palla ombra",
        power: 80,
        type: "ghost",
        damageClass: "special",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 20,
        effectDescription: "Has a 20% chance to lower the target's Special Defense by one stage."
      }
    ],
    enemySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/700.gif",
    previewSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png"
  },
  {
    name: "Luxray",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/405.gif",
    types: [
      "electric"
    ],
    stats: {
      hp: 80,
      attack: 120,
      defense: 79,
      spAttack: 95,
      spDefense: 79,
      speed: 70
    },
    abilities: [
      "rivalry",
      "intimidate",
      "guts"
    ],
    moves: [
      {
        name: "sprizzalampo",
        power: 90,
        type: "electric",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: -25,
        effectChance: null,
        effectDescription: "User receives 1/4 the damage it inflicts in recoil."
      },
      {
        name: "carineria",
        power: 90,
        type: "fairy",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to lower the target's Attack by one stage."
      },
      {
        name: "gelodenti",
        power: 65,
        type: "ice",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: null,
        maxHits: null,
        drain: 0,
        effectChance: 10,
        effectDescription: "Has a 10% chance to freeze the target and a 10% chance to make the target flinch."
      },
      {
        name: "doppiocalcio",
        power: 60,
        type: "fighting",
        damageClass: "physical",
        statChanges: [],
        priority: 0,
        minHits: 2,
        maxHits: 2,
        drain: 0,
        effectChance: 100,
        effectDescription: "Hits 2 times in one turn."
      }
    ],
    enemySprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/405.gif",
    previewSprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/405.png"
  }
]

export const rentalPkmn: BattlePkmn[] = demoPkmn.map(
  data =>
    new BattlePkmn(
      data.name,
      data.sprite,
      data.types,
      data.stats.hp,
      data.stats.attack,
      data.stats.defense,
      data.stats.spAttack,
      data.stats.spDefense,
      data.stats.speed,
      data.abilities,
      data.moves,
      data.enemySprite,
      data.previewSprite
    )
);
