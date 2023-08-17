import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { Story } from 'src/app/modules/models/story';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent {

    loading:boolean = true;
    stories: Story[] = [];
    stories$: Subscription = new Subscription()

    constructor(private storyService: StoryService) {
    
    }

    ngOnInit(): void {
      this.loadStories();

      // this.stories$ = this.storyService.getItems().subscribe(data => {
      //   if (data) {
      //     this.stories = data;
      //   }
      //   else {
      //     this.stories = new Array<Story>();
      //   }
      // });
    }


    
  loadStories(): void {
      this.storyService.getAll().subscribe((stories) => {
      this.stories = stories
      this.loading = false;
      console.log(stories);
    });
  }

    ngOnDestroy(): void {
      this.stories$.unsubscribe();
    }

  


}
