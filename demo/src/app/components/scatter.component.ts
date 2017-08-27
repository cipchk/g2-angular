import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'scatter',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class ScatterComponent {
  loading: boolean = true;
  chart: any;
  options = {
    height: 450,
    forceFit: true
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/scatter.json')
      .subscribe(ls => {
        this.render(ls);
        this.loading = false;
      });
  }

  render(data: any) {
    const chart = this.chart;

    let frame = new G2.Frame(data);
    let hAvg = G2.Frame.mean(frame, 'height'); // 计算体重的均值
    let wAvg = G2.Frame.mean(frame, 'weight'); // 计算身高均值
    let lineCfg = { // 线的配置信息
      stroke: '#94E08A'
    };
    chart.source(data, {
      weight: {
        alias: '体重（kg）'
      },
      height: {
        alias: '身高（cm）'
      }
    });
    chart.tooltip({
      title: null,
      crosshairs: {
        type: 'cross'
      }
    });
    chart.point().position('height*weight').color('gender', ['rgba(223, 83, 83, 0.7)', 'rgba(119, 152, 191, 0.7)']).shape('gender', ['circle', 'diamond']).size(6).tooltip('gender*height*weight');
    chart.guide().tag([hAvg, 'min'], [hAvg, 'max'], '身高平均值: ' + hAvg.toFixed(2), { line: lineCfg });
    chart.guide().tag(['min', wAvg], ['max', wAvg], '体重平均值: ' + wAvg.toFixed(2), { line: lineCfg });
    chart.render();
  }

  destroy() {
    console.log('scatter destroy');
  }

  constructor(private http: HttpClient) { }
}
