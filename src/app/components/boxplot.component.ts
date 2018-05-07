import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'boxplot',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `,
})
export class BoxPlotComponent {
  loading = true;
  chart: any;
  options = {
    forceFit: true,
    height: 450,
    plotCfg: {
      margin: [80, 120],
    },
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/iris.json').subscribe(ls => {
      this.render(chart, ls);
      this.loading = false;
    });
  }

  render(chart: any, data: any) {
    const { DataView } = DataSet;
    const dv = new DataView().source(data);
    dv
      .transform({
        type: 'fold',
        fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'], // 展开字段集
        key: 'type',
        value: 'value',
      })
      .transform({
        type: 'bin.quantile',
        field: 'value', // 计算分为值的字段
        as: '_bin', // 保存分为值的数组字段
        groupBy: ['Species', 'type'],
      });

    const colorMap = {
      'I. setosa': G2.Global.colors[0],
      'I. versicolor': G2.Global.colors[1],
      'I. virginica': G2.Global.colors[2],
    };

    chart.source(dv);
    chart.legend({
      marker: 'circle',
    });
    chart.tooltip({
      crosshairs: {
        type: 'rect',
      },
    });
    chart
      .schema()
      .position('type*_bin')
      .color('Species', val => {
        return colorMap[val];
      })
      .shape('box')
      .style('Species', {
        stroke: '#545454',
        fill: val => {
          return colorMap[val];
        },
        fillOpacity: 0.3,
      })
      .adjust('dodge');
    chart.render();
  }

  destroy() {
    console.log('boxplot destroy');
  }

  constructor(private http: HttpClient) {}
}
