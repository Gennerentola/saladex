export interface Move {
  name: string,
  power: number,
  type: string,
  damageClass: "physical" | "special" | "status",
  statChanges: StatChange[] | null,
  priority: number,
  minHits: number | null,
  maxHits: number | null,
  drain: number,
  effectChance: number | null,
  effectDescription: string
}

export interface StatChange {
  change: number,
  stat: string
}

export interface MoveReferenceDTO {
  name: string,
  url: string,
}
