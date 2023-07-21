import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { PkmnDTO } from 'src/app/dto/pkmnDTO';

@Component({
  selector: 'app-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.scss']
})
export class StatsChartComponent {

  @Input() stats?: PkmnDTO["stats"];
  chart: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats']) {

      if (this.chart) {
        this.chart.destroy();
      }
      this.stats = changes['stats'].currentValue;
      this.createChart();
    }
  }
  createChart() {
    this.chart = new Chart("stats", {
      type: 'polarArea',
      data: {
        labels: ['HP', 'ATTACCO', 'DIFESA',
          'DIFESA SP.', 'ATTACCO SP.', 'VELOCITÁ'],
        datasets: [
          {
            label: "Statistica Base",
            data: [
              this.stats?.hp,
              this.stats?.attack,
              this.stats?.defense,
              this.stats?.spDefense,
              this.stats?.spAttack,
              this.stats?.speed,
            ],
            backgroundColor: [
              "rgba(95, 233, 26, 0.5)",
              "rgba(234, 202, 48, 0.5)",
              "rgba(229, 115, 30, 0.5)",
              "rgba(78, 110, 213, 0.5)",
              "rgba(44, 188, 225, 0.5)",
              "rgba(204, 18, 197, 0.5)"
            ],
            borderColor: [
              "rgb(95, 233, 26)",
              "rgb(234, 202, 48)",
              "rgb(229, 115, 30)",
              "rgb(78, 110, 213)",
              "rgb(44, 188, 225)",
              "rgb(204, 18, 197)"
            ],
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        scales: {
          r: {
            pointLabels: {
              display: true,
              centerPointLabels: true,
            }
          }
        }
      }
    });
  }

}
