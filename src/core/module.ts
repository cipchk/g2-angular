import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { G2ChartComponent } from './component';
import { ScriptService } from './script.service';
import { G2ChartConfig } from './config';

@NgModule({
  imports: [CommonModule],
  providers: [ScriptService],
  declarations: [G2ChartComponent],
  exports: [G2ChartComponent]
})
export class G2ChartModule {
  static forRoot(config?: G2ChartConfig): ModuleWithProviders {
    return {
      ngModule: G2ChartModule,
      providers: [
        { provide: G2ChartConfig, useValue: config }
      ]
    };
  }
}

