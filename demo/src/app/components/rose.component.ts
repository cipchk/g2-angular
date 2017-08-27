import { Component } from '@angular/core';

@Component({
  selector: 'rose',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class RoseComponent {
  data = [
    { year: '2000', internally: 21.0, refugees: 16, seekers: 0.8 },
    { year: '2001', internally: 25.0, refugees: 16, seekers: 0.8 },
    { year: '2002', internally: 25.0, refugees: 15, seekers: 0.8 },
    { year: '2003', internally: 25.0, refugees: 14, seekers: 0.7 },
    { year: '2004', internally: 25.0, refugees: 14, seekers: 0.7 },
    { year: '2005', internally: 24.0, refugees: 13, seekers: 0.8 },
    { year: '2006', internally: 24.0, refugees: 14, seekers: 0.7 },
    { year: '2007', internally: 26.0, refugees: 16, seekers: 0.7 },
    { year: '2008', internally: 26.0, refugees: 15.2, seekers: 0.8 },
    { year: '2009', internally: 27.1, refugees: 15.2, seekers: 1.0 },
    { year: '2010', internally: 27.5, refugees: 15.4, seekers: 0.8 },
    { year: '2011', internally: 26.4, refugees: 15.2, seekers: 0.9 },
    { year: '2012', internally: 28.8, refugees: 15.4, seekers: 0.9 },
    { year: '2013', internally: 33.3, refugees: 16.7, seekers: 1.2 },
    { year: '2014', internally: 38.2, refugees: 19.5, seekers: 1.8 }
  ];
  options = {
    forceFit: true,
    height: 450
  };

  ready(chart: any) {
    let Frame = G2.Frame;
    let frame = new Frame(this.data); // 加工数据
    frame = Frame.combinColumns(frame, ['internally', 'refugees', 'seekers'], 'count', '难民类型', 'year');

    chart.source(frame);
    chart.coord('polar', { inner: 0.1 });
    chart.legend('难民类型', {
      position: 'bottom'
    });
    chart.intervalStack().position('year*count')
      .color('难民类型', ['rgb(136,186,174)', 'rgb(184,189,61)', 'rgb(107,136,138)'])
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
  }

  destroy() {
    console.log('rose destroy');
  }
}
