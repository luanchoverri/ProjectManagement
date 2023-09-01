
import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { Status } from 'src/app/modules/models/enum';
import { Story } from 'src/app/modules/models/story';

@Component({
  selector: 'app-doughnut-stories',
  templateUrl: './doughnut-stories.component.html',
  styleUrls: ['./doughnut-stories.component.scss']
})
export class DoughnutStoriesComponent implements AfterViewInit {

  doughnutChart!:Chart<"doughnut", number[], string>;


  constructor(private elementRef: ElementRef, private storyService: StoryService) { }


  ngAfterViewInit() {
    const ctx = this.elementRef.nativeElement.querySelector('#doughnutChart');
    this.storyService.stories$.subscribe(stories => {
      const doneCount = stories.filter(story => story.status === Status.Done).length;
      const runningCount = stories.filter(story => story.status === Status.Running).length;
      const todoCount = stories.filter(story => story.status === Status.Todo).length;

      this.doughnutChart =  new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Done', 'Running', 'Todo'],
          datasets: [
            {
              data: [doneCount, runningCount, todoCount],
              backgroundColor: [' rgb(63, 81, 181)','rgb(233, 30, 99)', 'rgb(255, 193, 7)']
            }
          ]
        },
        options: {
          responsive: true,
          
        }
      });
    });
    this.storyService.getAllItems().subscribe(stories => {
      this.updateChart(stories); // Sirve ara actualizar los datos del grafico
    });
  }
  
  updateChart(stories: Story[]) {
    const doneCount = stories.filter(story => story.status === Status.Done).length;
    const runningCount = stories.filter(story => story.status === Status.Running).length;
    const todoCount = stories.filter(story => story.status === Status.Todo).length;
  
    if (this.doughnutChart) {
      this.doughnutChart.data.datasets[0].data = [doneCount, runningCount, todoCount];
      this.doughnutChart.update(); // Actualiza el grafico con los nuevos datos
      this.doughnutChart.render(); // Vuelve a renderizar 
    }
  }
}
