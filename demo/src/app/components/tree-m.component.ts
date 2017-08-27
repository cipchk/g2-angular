import { Component } from '@angular/core';

@Component({
  selector: 'tree-m',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class TreeMComponent {
  data = [
    { gender: '男', count: 40, 'class': '一班', grade: '一年级' },
    { gender: '女', count: 30, 'class': '一班', grade: '一年级' },
    { gender: '男', count: 35, 'class': '二班', grade: '一年级' },
    { gender: '女', count: 45, 'class': '二班', grade: '一年级' },
    { gender: '男', count: 20, 'class': '三班', grade: '一年级' },
    { gender: '女', count: 35, 'class': '三班', grade: '一年级' },
    { gender: '男', count: 30, 'class': '一班', grade: '二年级' },
    { gender: '女', count: 40, 'class': '一班', grade: '二年级' },
    { gender: '男', count: 25, 'class': '二班', grade: '二年级' },
    { gender: '女', count: 32, 'class': '二班', grade: '二年级' },
    { gender: '男', count: 28, 'class': '三班', grade: '二年级' },
    { gender: '女', count: 36, 'class': '三班', grade: '二年级' }/**/
  ];
  options = {
    forceFit: true,
    height: 450
  };

  ready(chart: any) {
    const Stat = G2.Stat;
    chart.source(this.data);
    chart.coord('theta');
    chart.facet(['grade', 'class'], { type: 'tree', line: { stroke: '#00a3d7' }, smooth: true });
    chart.intervalStack().position(Stat.summary.percent('count')).color('gender');//
    chart.render();
  }

  destroy() {
    console.log('tree-m destroy');
  }
}
