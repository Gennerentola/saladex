import { Component, Input, SimpleChanges } from '@angular/core';
import { PkmnToCompareDTO } from 'src/app/dto/pkmnToCompareDTO';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-comparison-chart',
  templateUrl: './comparison-chart.component.html',
  styleUrls: ['./comparison-chart.component.scss']
})
export class ComparisonChartComponent {

  @Input() firstPokemon!: PkmnToCompareDTO;
  @Input() secondPokemon!: PkmnToCompareDTO;
  chart: any;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['firstPokemon']) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.firstPokemon = changes['firstPokemon'].currentValue;
      this.createChart();
    }
    if (changes['secondPokemon']) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.secondPokemon = changes['secondPokemon'].currentValue;
      this.createChart();
    }
  }

  createChart() {
    this.chart = new Chart("comparison", {
      type: 'radar',
      data: {
        labels: [
          'HP',
          'Attacco       ',
          'Difesa',
          'Velocità',
          'Difesa Sp.',
          'Attacco Sp.'
        ],
        datasets: [{
          label: this.firstPokemon.name,
          data: [
            this.firstPokemon.stats.hp,
            this.firstPokemon.stats.attack,
            this.firstPokemon.stats.defense,
            this.firstPokemon.stats.speed,
            this.firstPokemon.stats.spDefense,
            this.firstPokemon.stats.spAttack
          ],
          fill: true,
          backgroundColor: 'rgba(0, 160, 182, 0.2)',
          borderColor: 'rgb(0, 160, 182)',
          pointBackgroundColor: 'rgb(0, 160, 182)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(0, 160, 182)'
        },
        {
          label: this.secondPokemon.name,
          data: [
            this.secondPokemon.stats.hp,
            this.secondPokemon.stats.attack,
            this.secondPokemon.stats.defense,
            this.secondPokemon.stats.speed,
            this.secondPokemon.stats.spDefense,
            this.secondPokemon.stats.spAttack
          ],
          fill: true,
          backgroundColor: 'rgba(186, 0, 79, 0.2)',
          borderColor: 'rgb(186, 0, 79)',
          pointBackgroundColor: 'rgb(186, 0, 79)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(186, 0, 79)'
        }]
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
            angleLines: {
              display: true
            },
            suggestedMin: 0,
          }
        }
      }
    })
  }

}
