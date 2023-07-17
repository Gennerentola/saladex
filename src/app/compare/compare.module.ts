import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CompareRoutingModule } from './compare-routing.module';
import { PkmnComparisonComponent } from './pkmn-comparison/pkmn-comparison.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ComparisonChartComponent } from './comparison-chart/comparison-chart.component';


@NgModule({
  declarations: [
    PkmnComparisonComponent,
    ComparisonChartComponent
  ],
  imports: [
    CommonModule,
    CompareRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ]
})
export class CompareModule { }
