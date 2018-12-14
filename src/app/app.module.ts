import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HighlightJsModule } from 'ngx-highlight-js';

import { G2ChartModule } from 'g2-angular';

import { AppComponent } from './app.component';
import { LineComponent } from './components/line.component';
import { ScatterComponent } from './components/scatter.component';
import { AreaComponent } from './components/area.component';
import { BarComponent } from './components/bar.component';
import { PieComponent } from './components/pie.component';
import { RoseComponent } from './components/rose.component';
import { FunnelComponent } from './components/funnel.component';
import { HeatMapComponent } from './components/heatmap.component';
import { MapComponent } from './components/map.component';
import { DashboardComponent } from './components/dashboard.component';
import { BoxPlotComponent } from './components/boxplot.component';
import { TreeMComponent } from './components/tree-m.component';
import { CandlestickComponent } from './components/candlestick.component';
import { RadarComponent } from './components/radar.component';
import { RelationComponent } from './components/relation.component';
import { GaugeComponent } from './components/gauge.component';
import { VennComponent } from './components/venn.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LineComponent },
      { path: 'scatter', component: ScatterComponent },
      { path: 'area', component: AreaComponent },
      { path: 'bar', component: BarComponent },
      { path: 'pie', component: PieComponent },
      { path: 'rose', component: RoseComponent },
      { path: 'funnel', component: FunnelComponent },
      { path: 'heatmap', component: HeatMapComponent },
      { path: 'map', component: MapComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'boxplot', component: BoxPlotComponent },
      { path: 'tree-m', component: TreeMComponent },
      { path: 'candlestick', component: CandlestickComponent },
      { path: 'radar', component: RadarComponent },
      { path: 'relation', component: RelationComponent },
      { path: 'gauge', component: GaugeComponent },
      { path: 'venn', component: VennComponent }
    ], { useHash: true }),
    CommonModule,
    HighlightJsModule,

    G2ChartModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LineComponent,
    ScatterComponent,
    AreaComponent,
    BarComponent,
    PieComponent,
    RoseComponent,
    FunnelComponent,
    HeatMapComponent,
    MapComponent,
    DashboardComponent,
    BoxPlotComponent,
    TreeMComponent,
    CandlestickComponent,
    RadarComponent,
    RelationComponent,
    GaugeComponent,
    VennComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppDemoModule {
}
