
import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-doughnut-stories',
  templateUrl: './doughnut-stories.component.html',
  styleUrls: ['./doughnut-stories.component.scss']
})
export class DoughnutStoriesComponent implements AfterViewInit {
    constructor(private elementRef: ElementRef) {}
  
    ngAfterViewInit() {
      const ctx = this.elementRef.nativeElement.querySelector('#doughnutChart');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Done', 'Running', 'Todo'],
          datasets: [
            {
              data: [15, 10, 25], 
              backgroundColor: [ ' #673ab7',
              '#11cab8',
              '#b86dff'] 
            }
          ]
        },
        options: {
          responsive: true
        }
      });
    }
  }
  