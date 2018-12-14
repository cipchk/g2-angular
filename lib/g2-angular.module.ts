import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { G2ChartComponent } from './core/component';
import { G2ChartConfig } from './core/config';

@NgModule({
  imports: [CommonModule],
  declarations: [G2ChartComponent],
  exports: [G2ChartComponent],
})
export class G2ChartModule {
  static forRoot(config?: G2ChartConfig): ModuleWithProviders {
    return {
      ngModule: G2ChartModule,
      providers: [{ provide: G2ChartConfig, useValue: config }],
    };
  }
}
