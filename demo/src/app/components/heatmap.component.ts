import { Component } from '@angular/core';

@Component({
  selector: 'heatmap',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class HeatMapComponent {
  sites = ["湘湖", "滨康路", "西兴", "滨和路", "江陵路", "近江", "婺江路", "城站", "定安路", "龙翔桥", "凤起路", "武林广场", "西湖文化广场", "打铁关", "火车东站", "闸弄口", "彭埠", "七堡", "九和路", "九堡", "客运中心", "下沙西", "金沙湖", "高沙路", "文泽路"];
  data: any;
  options = {
    forceFit: true,
    height: 450,
    plotCfg: {
      margin: [20, 80, 20, 85]
    }
  };

  ngOnInit() {
    let data = [];
    for (let i = 0; i < this.sites.length; i++) {
      for (let j = this.sites.length - 1; j >= i; j--) {
        let price = 0;
        let step = Math.abs(j - i);
        if (step <= 2) {
          price = 2;
        } else if (step <= 4) {
          price = 3;
        } else if (step <= 7) {
          price = 4;
        } else if (step <= 13) {
          price = 5;
        } else if (step <= 16) {
          price = 6;
        } else if (step <= 21) {
          price = 7;
        } else {
          price = 8;
        }
        let obj = { from: this.sites[i], to: this.sites[j], price: price };
        data.push(obj);
      }
    }
    this.data = data;
  }

  ready(chart: any) {
    let defs = {
      'from': {
        values: this.sites
      },
      'to': {
        values: this.sites.slice(0).reverse()
      }
    };
    chart.axis('to', {
      title: null,
      grid: null,
      tickLine: null
    });
    chart.axis('from', false);
    chart.source(this.data, defs);
    chart.polygon().position('from*to')
      .color('price')
      .label('price', { offset: -2 })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    // 在上面添加文本
    chart.guide().text([0, this.sites.length], this.sites[0], {
      textAlign: 'center'
    });
    for (let i = 0; i < this.sites.length - 2; i++) {
      let site = this.sites[i];
      let nextSite = this.sites[i + 1];
      chart.guide().text([nextSite, site], nextSite, {
        textAlign: 'left'
      });
    }
    chart.guide().text([this.sites.length - 1, 1], this.sites[this.sites.length - 1], {
      textAlign: 'center'
    });
    chart.render();
  }

  destroy() {
    console.log('heat map destroy');
  }
}
