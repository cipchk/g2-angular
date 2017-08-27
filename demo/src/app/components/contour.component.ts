import { Component } from '@angular/core';

@Component({
  selector: 'contour',
  template: `
  <g2-chart [options]="options"
    (ready)="ready($event)"
    (destroy)="destroy()"></g2-chart>
  `
})
export class ContourComponent {
  data: any[] = [];
  options = {
    forceFit: true,
    height: 450
  };

  ngOnInit() {
    for (let i = 0; i <= 20; i++) {
      for (let j = 0; j <= 20; j++) {
        let x = i * 25.6;
        let y = j * 19.2;
        let z = 700 - (x + 0.5 * y) + Math.random() * (400);
        this.data.push({
          l: x,
          g: y,
          Altitude: z
        });
      }
    }
  }

  ready(chart: any) {
    const Stat = G2.Stat;
    //为了将数据与图片上的位置完全吻合，我们需要将横轴和纵轴的范围设定为数据对应范围，并将范围优化处理关闭
    let defs = {
      'l': {
        type: 'linear',
        min: 0,
        max: 512,
        nice: false//优化处理关闭
      },
      'g': {
        type: 'linear',
        min: 0,
        max: 384,
        nice: false
      },
      //等高线条数
      'Altitude': {
        tickCount: 5
      }
    };
    //由于数据坐标的原点在左下角，但是图片坐标原点在左上角，所以需要将数据坐标翻转
    chart.coord().reflect();
    //使用图片后可以隐藏坐标轴
    chart.axis(false);
    chart.source(this.data, defs);
    chart.contour().position(Stat.smooth.loess.triangular('l*g*Altitude', 0.01)).color('Altitude', 'hue').size(3);
    //引入背景图片
    chart.guide().image([0, 384], [512, 0], {
      src: 'https://t.alipayobjects.com/images/T1QoJoXdFXXXXXXXXX.jpg'
    });
    chart.render();
  }

  destroy() {
    console.log('contour destroy');
  }
}
