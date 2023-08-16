import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { Story } from 'src/app/modules/models/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {
 
  IdFromNav: string | null | undefined;
  id !: number;
  story !: Story | undefined;



  

  constructor(

    private route: ActivatedRoute,
    private storyService: StoryService
  ) {}

  ngOnInit(): void {
    this.IdFromNav = this.route.snapshot.paramMap.get('story-id');


    if (this.IdFromNav) {
      this.id = parseInt(this.IdFromNav);
      this.story = this.storyService.getItemById(this.id);
      // this.tasks = this.taskService.getTasksByStory(this.id);
    }

  }

  ngOnDestroy(): void {
    
  }
}
