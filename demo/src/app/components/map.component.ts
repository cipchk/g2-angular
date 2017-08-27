import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'map',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart class="china-map" [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `,
  styles: [`
  .china-map {
    display: block;
    background-image: url(https://zos.alipayobjects.com/rmsportal/kqiqfRADgLgCCNJRHhDv.png);
    background-repeat: no-repeat;
    width: 650px;
    height: 450px;
    background-size: 100%;
    margin: 0 auto;
  }
  `]
})
export class MapComponent {
  loading: boolean = true;
  chart: any;
  mapData: any;
  options = {
    width: 650,
    height: 450,
    plotCfg: {
      margin: [5, 185, 140, 53]
    }
  };

  ready(chart: any) {
    this.chart = chart;
    Observable.forkJoin(this.http.get('./assets/data/china.json'), this.http.get('./assets/data/temp.json'))
      .subscribe(results => {
        this.mapData = results[0];
        this.render(results[1]);
        this.loading = false;
      });
  }

  render(data: any) {
    const chart = this.chart;
    const Stat = G2.Stat;

    chart.source(data, {
      'out-temperature': {
        alias: '室外温度'
      }
    });
    chart.coord('map', {
      projection: 'mercator',
      max: [134.77, 63.68],
      min: [73.60, 18.48]
    });
    chart.tooltip({
      map: {
        'title': 'city',
        value: 'out-temperature'
      }
    });
    chart.heatmap().position(Stat.map.location('longitude*latitude')).color('out-temperature', '#50a3ba-#eac736-#d94e5d')
      .size(15) //调整热力图一个点可以影响的范围
      .label('city', { label: { opacity: 0 } }); // 设置文本但是不显示，使得tooltip可以显示对应的字段
    chart.render();
  }

  destroy() {
    console.log('map destroy');
  }

  constructor(private http: HttpClient) { }
}
