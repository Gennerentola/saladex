import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Chart } from 'chart.js';
import { PkmnPreview } from 'src/app/dto/pkmn-preview';

@Component({
  selector: 'app-preview-chart',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './preview-chart.component.html',
  styleUrls: ['./preview-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PreviewChartComponent {

  @Input() baseStats?: PkmnPreview["baseStats"];
  chart: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['baseStats']) {

      if (this.chart) {
        this.chart.destroy();
      }
      this.baseStats = changes['baseStats'].currentValue;
      this.createChart();
    }
  }
  createChart() {
    this.chart = new Chart("baseStats", {
      type: 'bar',
      data: {
        labels: [
          'HP',
          'ATTACCO',
          'ATTACCO SP.',
          'DIFESA',
          'DIFESA SP.',
          'VELOCITÁ'
        ],
        datasets: [
          {
            label: "Statistiche Base",
            data: [
              this.baseStats?.hp,
              this.baseStats?.attack,
              this.baseStats?.spAttack,
              this.baseStats?.defense,
              this.baseStats?.spDefense,
              this.baseStats?.speed,
            ],
            backgroundColor: [
              "rgba(95, 233, 26, 0.5)",
              "rgba(234, 202, 48, 0.5)",
              "rgba(44, 188, 225, 0.5)",
              "rgba(229, 115, 30, 0.5)",
              "rgba(78, 110, 213, 0.5)",
              "rgba(204, 18, 197, 0.5)"
            ],
            borderColor: [
              "rgb(95, 233, 26)",
              "rgb(234, 202, 48)",
              "rgb(44, 188, 225)",
              "rgb(229, 115, 30)",
              "rgb(78, 110, 213)",
              "rgb(204, 18, 197)"
            ],
            barThickness: 12
          }
        ]
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 1,
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
      }
    });
  }


}
