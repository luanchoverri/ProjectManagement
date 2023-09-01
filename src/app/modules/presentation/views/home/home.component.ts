import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  private totalPointsInDoneSubscription: Subscription = new Subscription;
  totalPointsInDone: number = 0;

  private totalDoneTasksSuscription: Subscription = new Subscription;
  totalDoneTasksCount: number = 0;
  
  
  
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
        table: { cols: 3, rows: 1 },
      };
    })
  );


  constructor(private breakpointObserver: BreakpointObserver, private ss: StoryService) {}



  ngOnInit(){
    this.totalPointsInDoneSubscription = this.ss.getTotalPointsInDone$().subscribe(points => {
      this.totalPointsInDone = points;
    });

    this.totalDoneTasksSuscription = this.ss.getTotalDoneTasksCount().subscribe(taskCounter => {
      this.totalDoneTasksCount = taskCounter;
    })

  }

  ngOnDestroy(): void {
    this.totalPointsInDoneSubscription.unsubscribe();
    this.totalDoneTasksSuscription.unsubscribe();
  }



}
