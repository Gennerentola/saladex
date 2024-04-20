import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PkmnSelectionComponent } from "./pkmn-selection/pkmn-selection.component";
import { BattleComponent } from "./battle/battle.component";

const routes: Routes = [
  {
    path: 'pkmn-selection',
    component: PkmnSelectionComponent
  },
  {
    path: 'battle',
    component: BattleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattleSimulatorRouting {

  constructor() { }

}
