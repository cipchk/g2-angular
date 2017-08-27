import { Component } from '@angular/core';

@Component({
  selector: 'pie',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class PieComponent {
  data = [
    { value: 335, type: '直达', name: '直达' },
    { value: 310, type: '营销广告', name: '邮件营销' },
    { value: 234, type: '营销广告', name: '联盟广告' },
    { value: 135, type: '营销广告', name: '视频广告' },
    { value: 1048, type: '搜索引擎', name: '百度' },
    { value: 251, type: '搜索引擎', name: '谷歌' },
    { value: 147, type: '搜索引擎', name: '必应' },
    { value: 102, type: '搜索引擎', name: '其他' }
  ];
  options = {
    forceFit: true,
    height: 450,
    plotCfg: {
      margin: 35
    }
  };

  ready(chart: any) {
    let Stat = G2.Stat;

    chart.legend(false);
    let viewBack = chart.createView();
    viewBack.source(this.data);
    viewBack.coord('theta', {
      radius: 0.5 // 设置饼图的大小
    });
    // 绘制内部的饼图
    viewBack.intervalStack()
      .position(Stat.summary.percent('value'))
      .color('type', ['#4E7CCC', '#36B3C3', '#F9815C'])
      .label('type', {
        offset: -10,
        label: {
          fontSize: 12
        }
      });
    // 绘制外圈饼图
    let view = chart.createView();
    view.source(this.data);
    view.coord('theta', {
      inner: 0.75 // 设置空心部分的大小
    });
    view.intervalStack()
      .position(Stat.summary.percent('value'))
      .color('name')
      .label('name*type')
      .selected({
        mode: 'multiple' // 设置 geom 的选择模式
      });
    chart.render();
    // 交互，内部饼图某个部分被点击触发外圈饼图选中
    chart.on('plotclick', function (ev) {
      let chartGeom = viewBack.get('geoms')[0];
      let viewGeom = view.get('geoms')[0];
      viewGeom.clearSelected();
      let selected = chartGeom.getSelected();
      if (selected) {
        let data = selected['_origin'];
        let selectedType = data.type;
        let items = viewGeom.getData();
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          if (item['_origin'].type === selectedType) {
            viewGeom.setSelected(item);
          }
        }
      }
    });
  }

  destroy() {
    console.log('pie destroy');
  }
}
