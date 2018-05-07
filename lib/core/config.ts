import { Injectable } from '@angular/core';

export class G2ChartConfig {
  /**
   * 指定G2资源路径
   * - [g2](https://gw.alipayobjects.com/os/antv/assets/g2/3.0.9/g2.min.js)
   * - [data-set](https://gw.alipayobjects.com/os/antv/assets/data-set/0.8.7/data-set.min.js)
   * - [g2-plugin-slider](https://gw.alipayobjects.com/os/antv/assets/g2-plugin-slider/2.0.2/g2-plugin-slider.js)
   */
  js?: string | string[];
}
