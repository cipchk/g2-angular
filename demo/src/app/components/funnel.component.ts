import { Component } from '@angular/core';

@Component({
  selector: 'funnel',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class FunnelComponent {
  data = [
    { "action": "Website visits", "value": 5654 },
    { "action": "Downloads", "value": 4064 },
    { "action": "Requested price list", "value": 1987 },
    { "action": "Invoice sent", "value": 976 },
    { "action": "Finalized", "value": 484 }
  ];
  options = {
    forceFit: true,
    height: 450,
    plotCfg: {
      margin: 80
    }
  };

  ready(chart: any) {
    chart.source(this.data);
    chart.coord('rect').transpose().scale(1, -1);
    chart.axis(false);
    chart.legend('action', {
      position: 'bottom'
    });
    chart.intervalSymmetric()
      .position('action*value')
      .color('action', ['#C82B3D', '#EB4456', '#F9815C', '#F8AB60', '#EDCC72'])
      .shape('funnel')
      .label('action', { offset: 10, label: { fontSize: 14 } }).animate({
        appear: {
          animation: 'zoomIn'
        },
        leave: {
          animation: 'fadeIn',
          easing: 'easeInQuart'
        }
      });
    chart.render();
  }

  destroy() {
    console.log('funnel destroy');
  }
}
