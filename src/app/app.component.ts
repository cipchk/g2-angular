import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" [routerLink]="['/']">Line</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/scatter']">Scatter</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/area']">Area</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/bar']">Bar</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/pie']">Pie</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/rose']">Rose</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/radar']">Radar</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/funnel']">Funnel</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/heatmap']">HeatMap</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/map']">Map</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/dashboard']">Dashboard</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/boxplot']">BoxPlot</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/tree-m']">tree-m</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/candlestick']">Candlestick</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/relation']">Relation</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/gauge']">Gauge</a>
        <li class="nav-item"><a class="nav-link" [routerLink]="['/venn']">Venn</a>
      </ul>
    </div>
  </nav>
    <p class="mb-2 mt-2">Angular for Alipay G2, document see <a href="https://github.com/cipchk/g2-angular/blob/master/README.md" target="_blank">README.md</a></p>
    <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

}
