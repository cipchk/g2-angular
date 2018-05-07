import { Component } from '@angular/core';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];

@Component({
  selector: 'bar',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `,
})
export class BarComponent {
  chart: any;
  options = {
    forceFit: true,
    height: 450
  };

  ready(chart: any) {
    this.chart = chart;
    chart.source(data);
    chart.scale('sales', {
      tickInterval: 20
    });
    chart.interval().position('year*sales');
    chart.render();
  }

  destroy() {
    console.log('bar destroy');
  }
}
