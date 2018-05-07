import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'scatter',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `,
})
export class ScatterComponent {
  loading = true;
  chart: any;
  options = {
    height: 450,
    forceFit: true,
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/scatter.json').subscribe(ls => {
      this.render(chart, ls);
      this.loading = false;
    });
  }

  render(chart: any, data: any) {
    chart.source(data);
    chart.tooltip({
      showTitle: false,
      crosshairs: {
        type: 'cross'
      },
      itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
        + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
        + '{name}<br/>'
        + '{value}'
        + '</li>'
    });
    chart.point().position('height*weight')
      .size(4)
      .shape('circle')
      .opacity(0.65)
      .tooltip('gender*height*weight', (gender, height, weight) => {
      return {
        name: gender,
        value: height + '(cm), ' + weight + '(kg)'
      };
    });
    chart.render();
  }

  destroy() {
    console.log('scatter destroy');
  }

  constructor(private http: HttpClient) {}
}
