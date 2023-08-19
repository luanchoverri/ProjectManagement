import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { Story } from 'src/app/modules/models/story';
import { StoryFormComponent } from '../../feature/forms/story-form/story-form.component';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
})
export class EpicComponent implements OnInit, OnDestroy {

  id!: string;
  epic!: Epic ;

  loading: boolean = true;

  // observables/ suscripcion lista de historias
  stories: Story[] = [];
  stories$: Subscription = new Subscription();
  storiesServ : any;
  formComponent: any;

  constructor(
    private epicService: EpicService,
    private route: ActivatedRoute,
    private storyService: StoryService
  ) {
    this.storiesServ = storyService;
    this.formComponent = StoryFormComponent;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('epic-id'); // Obtiene el id del parametro de la URL

      if (id) {
        const info$ = this.getSpecificationsById(id);
        const stories$ = this.getStories(id);

        forkJoin([info$, stories$ ]).subscribe(
          ([info, stories]) => {
            this.epic = info;
            this.stories = stories;
            this.loading = false;
          }
        );
      }
    });
  }


  getSpecificationsById(id: string) {
    return this.epicService.getEpicById(id);
  }

  getStories(id: string) {
    return this.epicService.getStoriesByEpic(id);
  }

  ngOnDestroy(): void {
    this.stories$.unsubscribe();
  }


  



  
}