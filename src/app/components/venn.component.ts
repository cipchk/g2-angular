import { Component } from '@angular/core';

@Component({
  selector: 'venn',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `,
})
export class VennComponent {
  options = {
    forceFit: true,
    height: 450,
    padding: 10,
  };

  ready(chart: any) {
    const data = [
      { sets: ['A'], size: 12, label: 'A' },
      { sets: ['B'], size: 12, label: 'B' },
      { sets: ['C'], size: 12, label: 'C' },
      { sets: ['A', 'B'], size: 2, label: 'A&B' },
      { sets: ['A', 'C'], size: 2, label: 'A&C' },
      { sets: ['B', 'C'], size: 2, label: 'B&C' },
      { sets: ['A', 'B', 'C'], size: 1 },
    ];
    chart.source(data);
    chart.axis(false);
    chart.legend(false);
    chart.tooltip(false);
    chart
      .venn()
      .label('sets') // 这个字段用来获取集合关系字段
      .size('size') // 这个字段用来获取集合 size
      .color('id')
      .active(false)
      .style({
        lineWidth: 10,
        padding: 10,
        textStyle: {
          fill: 'white',
          textAlign: 'center',
          fontSize: 32,
        },
      });
    chart.render();
  }

  destroy() {
    console.log('funnel destroy');
  }
}
