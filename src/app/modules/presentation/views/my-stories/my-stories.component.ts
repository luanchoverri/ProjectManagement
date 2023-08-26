import { Component } from '@angular/core';
import { LIST_SERVICE_TOKEN } from 'src/app/modules/core/services/list/list.service';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { Story } from 'src/app/modules/models/story';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss'],
  providers: [{
    provide: LIST_SERVICE_TOKEN,
    useExisting: StoryService,
  }],
})

export class MyStoriesComponent {
  loading: boolean = true;
  stories: Story[] = [];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.storyService.getStories().subscribe(
      (stories) => {
        this.stories = stories;
        this.loading = false;
      }
    );
  }

}
