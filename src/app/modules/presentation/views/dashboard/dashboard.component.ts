import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
[x: string]: any;

   C : number= 5;

  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          miniCard: { cols: this.C, rows: 1 },
          chart:    {cols: this.C, rows:1},
          calendar: { cols: this.C, rows: 2 },

        };
      }

      return {
        miniCard: { cols: 1, rows: 1 },
        calendar: { cols: 1, rows: 2 },
        chart: { cols: 2, rows: 1 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
