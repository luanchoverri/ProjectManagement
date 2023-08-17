import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
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

  epicId!: string;
  epic!: Epic ;

  loading: boolean = true;

  // observables/ suscripcion lista de historias
  stories: Story[] = [];
  stories$: Subscription = new Subscription();

  constructor(
    private epicService: EpicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const epicId = params.get('epic-id'); // Obtén el ID del parámetro de la URL

      if (epicId) {
        const getSpecifications$ = this.getEpicSpecificationsById(epicId);
        const getStories$ = this.getStories(epicId);

        forkJoin([getSpecifications$, getStories$]).subscribe(
          ([specifications, stories]) => {
            this.epic = specifications;
            this.stories = stories;
            this.loading = false;
          }
        );
      }
    });
  }


  getEpicSpecificationsById(id: string) {
    return this.epicService.getEpicById(id);
  }

  getStories(id: string) {
    return this.epicService.getStoriesByEpic(id);
  }

  ngOnDestroy(): void {
    this.stories$.unsubscribe();
  }


  



  
}