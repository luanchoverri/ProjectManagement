import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from 'src/app/modules/models/story';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent {


    stories: Story[];
    stories$: Subscription;

    constructor(private storyService: StoryService) {
      this.stories = new Array<Story>();
      this.stories$ = new Subscription();
    }

    ngOnInit(): void {
      this.stories$ = this.storyService.getItems().subscribe(data => {
        if (data) {
          this.stories = data;
        }
        else {
          this.stories = new Array<Story>();
        }
      });
    }

    ngOnDestroy(): void {
      this.stories$.unsubscribe();
    }

  


}
