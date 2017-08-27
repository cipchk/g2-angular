import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HighlightJsModule } from 'ngx-highlight-js';

import { G2ChartModule } from 'g2-angular';

import { AppComponent } from './app.component';
import { LineComponent } from './components/line.component';
import { ScatterComponent } from './components/scatter.component';
import { AreaComponent } from "./components/area.component";
import { BarComponent } from "./components/bar.component";
import { PieComponent } from "./components/pie.component";
import { RoseComponent } from "./components/rose.component";
import { KChartComponent } from "./components/k-chart.component";
import { FunnelComponent } from "./components/funnel.component";
import { HeatMapComponent } from "./components/heatmap.component";
import { MapComponent } from "./components/map.component";
import { TreeMapComponent } from "./components/treemap.component";
import { DashboardComponent } from "./components/dashboard.component";
import { DiagramComponent } from "./components/diagram.component";
import { BoxPlotComponent } from "./components/boxplot.component";
import { AsterComponent } from "./components/aster.component";
import { TreeMComponent } from "./components/tree-m.component";
import { ContourComponent } from "./components/contour.component";

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
      { path: 'k-chart', component: KChartComponent },
      { path: 'funnel', component: FunnelComponent },
      { path: 'heatmap', component: HeatMapComponent },
      { path: 'map', component: MapComponent },
      { path: 'treemap', component: TreeMapComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'diagram', component: DiagramComponent },
      { path: 'boxplot', component: BoxPlotComponent },
      { path: 'aster', component: AsterComponent },
      { path: 'tree-m', component: TreeMComponent },
      { path: 'contour', component: ContourComponent }
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
    KChartComponent,
    FunnelComponent,
    HeatMapComponent,
    MapComponent,
    TreeMapComponent,
    DashboardComponent,
    DiagramComponent,
    BoxPlotComponent,
    AsterComponent,
    TreeMComponent,
    ContourComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppDemoModule {
}
