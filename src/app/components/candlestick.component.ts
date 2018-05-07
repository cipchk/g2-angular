import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'candlestick',
  template: `
  <p *ngIf="loading">data loading...</p>
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  <div id="slider"></div>
  `,
})
export class CandlestickComponent {
  loading = true;
  chart: any;
  options = {
    forceFit: true,
    height: 450,
    animate: false,
    padding: [10, 40, 40, 40],
  };

  ready(chart: any) {
    this.chart = chart;
    this.http.get('./assets/data/candle-sticks.json').subscribe(ls => {
      this.render(chart, ls);
      this.loading = false;
    });
  }

  render(chart: any, data: any) {
    // 设置状态量，时间格式建议转换为时间戳，转换为时间戳时请注意区间
    const ds = new DataSet({
      state: {
        start: '2015-04-07',
        end: '2015-07-28',
      },
    });
    const dv = ds.createView();
    dv
      .source(data)
      .transform({
        type: 'filter',
        callback: obj => {
          const date = obj.time;
          return date <= ds.state.end && date >= ds.state.start;
        },
      })
      .transform({
        type: 'map',
        callback: obj => {
          obj.trend = obj.start <= obj.end ? '上涨' : '下跌';
          obj.range = [obj.start, obj.end, obj.max, obj.min];
          return obj;
        },
      });

    chart.source(dv, {
      time: {
        type: 'timeCat',
        nice: false,
        range: [0, 1],
      },
      trend: {
        values: ['上涨', '下跌'],
      },
      volumn: { alias: '成交量' },
      start: { alias: '开盘价' },
      end: { alias: '收盘价' },
      max: { alias: '最高价' },
      min: { alias: '最低价' },
      range: { alias: '股票价格' },
    });
    chart.legend({
      offset: 20,
    });
    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li data-index={index}>' +
        '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
        '{name}{value}</li>',
    });

    const kView = chart.view({
      end: {
        x: 1,
        y: 0.5,
      },
    });
    kView.source(dv);
    kView
      .schema()
      .position('time*range')
      .color('trend', val => {
        if (val === '上涨') {
          return '#f04864';
        }

        if (val === '下跌') {
          return '#2fc25b';
        }
      })
      .shape('candle')
      .tooltip('time*start*end*max*min', (time, start, end, max, min) => {
        return {
          name: time,
          value:
            '<br><span style="padding-left: 16px">开盘价：' +
            start +
            '</span><br/>' +
            '<span style="padding-left: 16px">收盘价：' +
            end +
            '</span><br/>' +
            '<span style="padding-left: 16px">最高价：' +
            max +
            '</span><br/>' +
            '<span style="padding-left: 16px">最低价：' +
            min +
            '</span>',
        };
      });

    const barView = chart.view({
      start: {
        x: 0,
        y: 0.65,
      },
    });
    barView.source(dv, {
      volumn: {
        tickCount: 2,
      },
    });
    barView.axis('time', {
      tickLine: null,
      label: null,
    });
    barView.axis('volumn', {
      label: {
        formatter: (val: any) => {
          return parseInt((val / 1000).toString(), 10) + 'k';
        },
      },
    });
    barView
      .interval()
      .position('time*volumn')
      .color('trend', val => {
        if (val === '上涨') {
          return '#f04864';
        }

        if (val === '下跌') {
          return '#2fc25b';
        }
      })
      .tooltip('time*volumn', (time, volumn) => {
        return {
          name: time,
          value:
            '<br/><span style="padding-left: 16px">成交量：' +
            volumn +
            '</span><br/>',
        };
      });

    chart.render();

    // 生成 slider
    const slider = new Slider({
      container: 'slider', // DOM id
      width: 'auto',
      height: 26,
      padding: [20, 40, 20, 40],
      start: ds.state.start, // 和状态量对应
      end: ds.state.end,
      data, // 源数据
      xAxis: 'time', // 背景图的横轴对应字段，同时为数据筛选的字段
      yAxis: 'volumn', // 背景图的纵轴对应字段，同时为数据筛选的字段
      scales: {
        time: {
          type: 'timeCat',
          nice: false,
        },
      },
      onChange: ({ startText, endText }) => {
        ds.setState('start', startText);
        ds.setState('end', endText);
      },
    });
    slider.render();
  }

  destroy() {
    console.log('boxplot destroy');
  }

  constructor(private http: HttpClient) {}
}
