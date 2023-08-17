import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { Story } from 'src/app/modules/models/story';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
})
export class EpicComponent implements OnInit, OnDestroy {
 
  epicIdFromNav: string | null | undefined;
  id !: string;
  epic !: Epic ;



  // observables/ suscripcion lista de historias
  stories: Story[] = [];
  stories$: Subscription = new Subscription();


  constructor(
    private epicService: EpicService,
    private route: ActivatedRoute,
    private storyService: StoryService
  ) {}

  ngOnInit(): void {
    this.epicIdFromNav = this.route.snapshot.paramMap.get('epic-id');
    console.log('este es epic-id', this.epicIdFromNav);

    if (this.epicIdFromNav) {
      this.id = (this.epicIdFromNav);
      // this.epic = this.epicService.getItemById(this.id);
      // this.stories = this.storyService.getStoriesByEpicId(this.id);
    }

    console.log('data epicas', this.stories);
  }

  ngOnDestroy(): void {
    this.stories$.unsubscribe();
  }
}
