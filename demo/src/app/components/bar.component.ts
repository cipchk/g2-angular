import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'bar',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class BarComponent {
  loading: boolean = true;
  chart: any;
  options = {
    forceFit: true,
    height: 450,
    plotCfg: {
      margin: [20, 60, 80, 120]
    }
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/top2000.json')
      .subscribe(ls => {
        this.render(ls);
        this.loading = false;
      });
  }

  render(data: any) {
    const chart = this.chart;
    const Stat = G2.Stat;

    let Frame = G2.Frame;
    let frame = new Frame(data);
    frame = Frame.sort(frame, 'release');

    chart.setMode('select'); // 开启框选模式
    chart.select('rangeX'); // 设置 X 轴范围的框选
    chart.source(frame, {
      '..count': {
        alias: 'top2000 唱片总量'
      },
      release: {
        tickInterval: 5,
        alias: '唱片发行年份'
      }
    });
    chart.interval().position(Stat.summary.count('release')).color('#e50000');
    chart.render();
    // 监听双击事件，这里用于复原图表
    chart.on('plotdblclick', function (ev) {
      chart.get('options').filters = {}; // 清空 filters
      chart.repaint();
    });
  }

  destroy() {
    console.log('bar destroy');
  }

  constructor(private http: HttpClient) { }
}
