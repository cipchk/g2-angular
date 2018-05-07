import { Component } from '@angular/core';

@Component({
  selector: 'pie',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `,
})
export class PieComponent {
  data = [
    { item: '事例一', count: 40 },
    { item: '事例二', count: 21 },
    { item: '事例三', count: 17 },
    { item: '事例四', count: 13 },
    { item: '事例五', count: 9 },
  ];
  options = {
    forceFit: true,
    height: 450,
  };

  ready(chart: any) {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(this.data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    chart.source(dv, {
      percent: {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        },
      },
    });
    chart.coord('theta', {
      radius: 0.75,
    });
    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });
    chart
      .intervalStack()
      .position('percent')
      .color('item')
      .label('percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val;
        },
      })
      .tooltip('item*percent', (item, percent) => {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent,
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });
    chart.render();
  }

  destroy() {
    console.log('pie destroy');
  }
}
