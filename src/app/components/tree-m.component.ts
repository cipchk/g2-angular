import { Component } from '@angular/core';

@Component({
  selector: 'tree-m',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `,
})
export class TreeMComponent {
  data = [
    { gender: '男', count: 40, class: '一班', grade: '一年级' },
    { gender: '女', count: 30, class: '一班', grade: '一年级' },
    { gender: '男', count: 35, class: '二班', grade: '一年级' },
    { gender: '女', count: 45, class: '二班', grade: '一年级' },
    { gender: '男', count: 20, class: '三班', grade: '一年级' },
    { gender: '女', count: 35, class: '三班', grade: '一年级' },
    { gender: '男', count: 30, class: '一班', grade: '二年级' },
    { gender: '女', count: 40, class: '一班', grade: '二年级' },
    { gender: '男', count: 25, class: '二班', grade: '二年级' },
    { gender: '女', count: 32, class: '二班', grade: '二年级' },
    { gender: '男', count: 28, class: '三班', grade: '二年级' },
    { gender: '女', count: 36, class: '三班', grade: '二年级' },
  ];
  options = {
    forceFit: true,
    height: 450,
    padding: [60, 90, 80, 80],
  };

  ready(chart: any) {
    const { DataView } = DataSet;
    chart.source(this.data);
    chart.coord('theta');
    chart.tooltip({
      showTitle: false,
    });
    chart.facet('tree', {
      fields: ['grade', 'class'],
      line: {
        stroke: '#00a3d7',
      },
      lineSmooth: true,
      eachView(view, facet) {
        const data = facet.data;
        const dv = new DataView();
        dv.source(data).transform({
          type: 'percent',
          field: 'count',
          dimension: 'gender',
          as: 'percent',
        });
        view.source(dv, {
          percent: {
            formatter(val) {
              return (val * 100).toFixed(2) + '%';
            },
          },
        });
        view
          .intervalStack()
          .position('percent')
          .color('gender');
      },
    });
    chart.render();
  }

  destroy() {
    console.log('tree-m destroy');
  }
}
