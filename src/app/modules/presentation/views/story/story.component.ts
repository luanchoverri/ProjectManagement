import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { Story } from 'src/app/modules/models/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {
 
  id !: string;
  story !: Story ;
  loading: boolean = true;
  // tasks: Task[] = []; Agregar

  constructor(

    private route: ActivatedRoute,
    private storyService: StoryService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const id = params.get('story-id'); 
      if (id) {
        const info$ = this.getSpecificationsById(id);
        // const tasks$ = this.getTasks(id);

        forkJoin([info$]).subscribe(
          ([info]) => {
            this.story = info;
            // this.tasks = tasks;
            this.loading = false;
          }
        );
      }
    });
  }


  getSpecificationsById(id: string) {
    return this.storyService.getStoryById(id);
  }

  getEpics(id: string) {
    return this.storyService.getTasksByStory(id);
  }

  ngOnDestroy(): void {
    
  }
}
