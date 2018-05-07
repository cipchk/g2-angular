import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'relation',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  <div id="slider"></div>
  `,
})
export class RelationComponent {
  loading = true;
  chart: any;
  options = {
    forceFit: true,
    height: 450,
    animate: false,
    padding: [60, 0, 40, 0],
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/flare.json').subscribe(ls => {
      this.render(chart, ls);
      this.loading = false;
    });
  }

  render(chart: any, data: any) {
    const dv = new DataSet.View().source(data, {
      type: 'hierarchy',
    });
    dv.transform({
      type: 'hierarchy.cluster',
    });

    chart.axis(false);
    chart.legend(false);
    chart.coord('polar');

    const edgeView = chart.view();
    edgeView.source(
      dv.getAllLinks().map(link => ({
        x: [link.source.x, link.target.x],
        y: [link.source.y, link.target.y],
        source: link.source.id,
        target: link.target.id,
      })),
    );
    edgeView
      .edge()
      .position('x*y')
      .shape('smooth') // vhv
      .color('grey')
      .opacity(0.5)
      .tooltip('source*target');

    const nodeView = chart.view();
    nodeView.source(
      dv.getAllNodes().map(node => ({
        hasChildren: !!(node.data.children && node.data.children.length),
        name: node.data.name,
        value: node.value,
        depth: node.depth,
        x: node.x,
        y: node.y,
      })),
    );
    nodeView
      .point()
      .position('x*y')
      .color('hasChildren')
      .label('name', {
        offset: 0,
        labelEmit: true,
        textStyle: (text, item) => {
          let textAlign = item.textAlign;
          if (item.point.hasChildren) {
            textAlign = textAlign === 'left' ? 'right' : 'left';
          }
          return {
            fill: 'grey',
            fontSize: 9,
            textAlign,
          };
        },
      });

    chart.render();
  }

  destroy() {
    console.log('boxplot destroy');
  }

  constructor(private http: HttpClient) {}
}
