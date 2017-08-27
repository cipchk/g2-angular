import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

@Component({
  selector: 'treemap',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class TreeMapComponent {
  loading: boolean = true;
  chart: any;
  options = {
    forceFit: true,
    height: 450,
    plotCfg: {
      margin: 0
    }
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/mobile.json')
      .map((data: any[]) => {
        for (var i = 0; i < data.length; i++) {
          var node = data[i];
          if (node.children) {
            for (var j = 0; j < node.children.length; j++) {
              node.children[j].brand = node.brand;
            }
          }
        }
        return data;
      })
      .subscribe(ls => {
        this.render(ls);
        this.loading = false;
      });
  }

  render(data: any) {
    const chart = this.chart;
    const Stat = G2.Stat;

    chart.source(data);
    chart.tooltip({
      map: {
        title: 'brand',
        name: 'name',
        value: 'value'
      }
    });
    chart.axis(false);
    chart.legend(false);
    chart.polygon().position(Stat.treemap('children*value*name')).color('brand')
      .label('brand*..level*value', function (name, level, value) {
        if (level === 0 && value > 0.2) { // 只有第一层的，同时占比超过 0.2
          return name;
        }
      }, {
        offset: 2,
        label: {
          'fontSize': 12,
          'fontWeight': 'bold',
          fill: '#000',
          shadowBlur: 10,
          shadowColor: '#fff'
        }
      })
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.render();
  }

  destroy() {
    console.log('treemap destroy');
  }

  constructor(private http: HttpClient) { }
}
