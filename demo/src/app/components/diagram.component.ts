import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'diagram',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class DiagramComponent {
  loading: boolean = true;
  chart: any;
  options = {
    forceFit: true,
    height: 450,
    animate: false,
    plotCfg: {
      margin: [80, 0, 80, 0]
    }
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/relationship.json')
      .subscribe(ls => {
        this.render(ls);
        this.loading = false;
      });
  }

  render(data: any) {
    const chart = this.chart;
    const Stat = G2.Stat;// 统计算法对象
    const Layout = G2.Layout;// 布局算法对像
    let nodes = data.nodes; // 节点数据
    let links = data.links; // 边数据
    links.map(function (link) {
      let sourceObj = nodes.filter(function (node) {
        return node.id == link.source;
      })[0];
      link.type = sourceObj.modularity_class; // 边按照源节点的类型进行分类
    });
    // 线性布局Linear
    let layout = new Layout.Linear({
      nodes: nodes
    });
    nodes = layout.getNodes();// 获取布局后的节点数据
    chart.legend(false);
    chart.tooltip({
      title: null
    });
    // 创建边视图
    let edgeView = chart.createView();
    edgeView.source(links);
    edgeView.coord('polar').reflect('y');  // 使用极坐标，反转y轴(布局方法默认给y赋值为0)
    edgeView.axis(false);
    edgeView.edge()
      // 由于边的坐标数据较多，此处使用统计函数简化语法，Stat.link计算布局后的边的坐标，放在..x和..y中，数值范围是 0-1
      .position(Stat.link('source*target', nodes))
      .shape('arc') // 使用弧线完成边的绘制
      .color('type')
      .opacity(0.5)
      .tooltip('source*target');
    // 创建节点视图
    let nodeView = chart.createView();
    nodeView.coord('polar').reflect('y');
    nodeView.axis(false);
    nodeView.source(nodes);
    nodeView.point()
      .position('x*y') // nodes数据的x、y由layout方法计算得出
      .color('modularity_class')
      .size('size')
      .shape('circle')
      .label('label', {
        offset: 10,
        labelLine: false,
        labelEmit: true  // 配置label文字为放射状
      })
      .tooltip('size*modularity_class');
    chart.render();
  }

  destroy() {
    console.log('diagram destroy');
  }

  constructor(private http: HttpClient) { }
}
