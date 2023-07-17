import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PkmnComparisonComponent } from './pkmn-comparison/pkmn-comparison.component';

const routes: Routes = [
  {
    path: 'pokemon-comparison',
    component: PkmnComparisonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareRoutingModule { }
