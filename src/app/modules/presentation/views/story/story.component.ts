import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { TaskService } from 'src/app/modules/core/services/task/task.service';
import { Story } from 'src/app/modules/models/story';
import { Task } from 'src/app/modules/models/task.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {
 
  id !: string;
  story !: Story ;
  loading: boolean = true;
   tasks: Task[] = []; 

  constructor(

    private route: ActivatedRoute,
    private storyService: StoryService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const id = params.get('story-id'); 
      if (id) {
        const info$ = this.getSpecificationsById(id);
         const tasks$ = this.getTasks(id);

        forkJoin([info$, tasks$]).subscribe(
          ([info, tasks]) => {
            this.story = info;
             this.tasks = tasks;
            this.loading = false;
          }
        );
      }
    });
  }


  getSpecificationsById(id: string) {
    return this.storyService.getStoryById(id);
  }

  getTasks(id: string) {
    return this.storyService.getTasksByStory(id);
  }

  ngOnDestroy(): void {
    
  }
}
