import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
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
  selectedStories: Story[] = [];
  allstories: Story[] = [];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.storyService.getAllItems().subscribe({
      next: (stories) => {
        this.allstories = stories;
        this.selectedStories = stories;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        alert('Error fetching stories');
      }
    }
    );
  }

  onChange(selected: any) {
    if (selected.value === 'all') {
      this.selectedStories = this.allstories;
    }
    else {
      this.selectedStories = this.allstories.filter((story) => story.status === selected.value);
    }
  }

}
