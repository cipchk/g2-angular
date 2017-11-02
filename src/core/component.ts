import { Component, Input, OnDestroy, OnChanges, ViewChild, ElementRef, Output, EventEmitter, NgZone, SimpleChanges } from '@angular/core';
import { G2ChartConfig } from './config';
import { ScriptService } from "./script.service";

declare var window: any;

@Component({
  selector: 'g2-chart',
  template: ``
})
export class G2ChartComponent implements OnDestroy, OnChanges {
  static idPool = 0;
  private instance: any;
  private id: string;
  private initFlag: boolean = false;

  @Input() options: any;
  @Output() ready = new EventEmitter<any>();
  @Output() destroy = new EventEmitter();

  constructor(
    private el: ElementRef,
    private config: G2ChartConfig,
    private ss: ScriptService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) this.init();
  }

  ngOnInit() {
    // 构建一个虚拟id
    this.id = 'angular-g2-' + ++G2ChartComponent.idPool;
    this.el.nativeElement.id = this.id;
    this.initFlag = true;

    // 已经存在对象无须进入懒加载模式
    if (window.G2) {
      this.init();
      return;
    }

    this.ss.load(this.config.js).getChangeEmitter().subscribe(res => {
      this.init();
    });
  }

  private init(options?: any) {
    if (!this.initFlag) return;

    if (this.instance) {
      this._destroy(false);
    }
    // 强制设置container为null，并使用 `id` 初始化
    this.instance = new window.G2.Chart(Object.assign({}, this.options, {
      id: this.id,
      container: null
    }));
    this.ready.emit(this.instance);
  }

  private _destroy(needNotify: boolean = false) {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
    if (needNotify) this.destroy.emit();
  }

  /**
   * 获取Chart实例
   *
   * @readonly
   */
  get Instance(): any {
    return this.instance;
  }

  ngOnDestroy() {
    this._destroy(true);
  }
}
