import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'boxplot',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class BoxPlotComponent {
  loading: boolean = true;
  chart: any;
  options = {
    forceFit: true,
    height: 450,
    plotCfg: {
      margin: [80, 120]
    }
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/iris_flower_data.json')
      .subscribe(ls => {
        this.render(ls);
        this.loading = false;
      });
  }

  render(data: any) {
    const chart = this.chart;
    const Stat = G2.Stat;
    const Util = G2.Util;
    const Frame = G2.Frame;
    let frame = new Frame(data);
    frame = Frame.combinColumns(frame, ['萼片长度', '萼片宽度', '花瓣长度', '花瓣宽度'], 'value', 'type', '品种');
    chart.source(frame);
    chart.facet(['品种']);
    chart.schema().position(Stat.bin.quantile.letter('type*value')).color('品种').shape('box');
    chart.render();
    chart.on('tooltipchange', function (ev) {
      let items = ev.items;
      let origin = items[0];
      let values = origin.point._origin.value;
      items.splice(0); // 清空
      items.push(Util.mix({}, origin, {
        name: '最小值',
        value: values[0].toFixed(2)
      }));
      items.push(Util.mix({}, origin, {
        name: '下四分位数',
        value: values[1].toFixed(2),
      }));
      items.push(Util.mix({}, origin, {
        name: '中位数',
        value: values[2].toFixed(2),
      }));
      items.push(Util.mix({}, origin, {
        name: '上四分位数',
        value: values[3].toFixed(2),
        marker: 'circle'
      }));
      items.push(Util.mix({}, origin, {
        name: '最大值',
        value: values[4].toFixed(2),
        marker: 'circle'
      }));
    });
  }

  destroy() {
    console.log('boxplot destroy');
  }

  constructor(private http: HttpClient) { }
}
