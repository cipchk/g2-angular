import { Component } from '@angular/core';

@Component({
  selector: 'line',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `,
})
export class LineComponent {
  data = [
    { month: 'Jan', temperature: 7.0 },
    { month: 'Feb', temperature: 6.9 },
    { month: 'Mar', temperature: 9.5 },
    { month: 'Apr', temperature: 14.5 },
    { month: 'May', temperature: 18.2 },
    { month: 'Jun', temperature: 21.5 },
    { month: 'Jul', temperature: 25.2 },
    { month: 'Aug', temperature: 26.5 },
    { month: 'Sep', temperature: 23.3 },
    { month: 'Oct', temperature: 18.3 },
    { month: 'Nov', temperature: 13.9 },
    { month: 'Dec', temperature: 9.6 },
  ];
  options = {
    height: 450,
    forceFit: true,
  };

  ready(chart: any) {
    chart.source(this.data, {
      month: {
        alias: '月份',
        range: [0, 1],
      },
      temperature: {
        alias: '平均温度(°C)',
      },
    });
    chart
      .line()
      .position('month*temperature')
      .size(2);
    chart.render();
  }

  destroy() {
    console.log('line destroy');
  }
}
