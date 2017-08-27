import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'k-chart',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class KChartComponent {
  loading: boolean = true;
  chart: any;
  options = {
    forceFit: true,
    height: 450
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/stock-03.json')
      .subscribe(ls => {
        this.render(ls);
        this.loading = false;
      });
  }

  render(data: any) {
    const chart = this.chart;

    chart.source(data, {
      'date': {
        type: 'time',
        nice: false,
        mask: 'mm-dd',
        tickCount: 10
      },
      range: {
        min: 20,
        max: 35,
        nice: false,
        tickInterval: 2
      },
      mean: {
        min: 20,
        max: 35,
        nice: false
      },
      'start+end+highest+lowest': {
        min: 20,
        max: 35,
        nice: false
      }
    });
    chart.axis('date', {
      title: null
    });
    chart.axis('range', {
      title: null
    });
    chart.axis('mean', false);
    chart.axis('start+end+highest+lowest', false);
    chart.tooltip({
      crosshairs: true
    });
    chart.area().position('date*range').color('#64b5f6');
    chart.schema()
      .position('date*(start+end+highest+lowest)')
      .color('trend', ['#64b5f6', '#ef6c00'])
      .shape('candle')
      .tooltip('start*end*highest*lowest');
    chart.line().position('date*mean').color('#ef6c00');
    chart.render();
  }

  destroy() {
    console.log('k-chart destroy');
  }

  constructor(private http: HttpClient) { }
}
