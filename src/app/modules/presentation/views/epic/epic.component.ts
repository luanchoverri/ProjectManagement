import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { Story } from 'src/app/modules/models/story';
import { StoryFormComponent } from '../../feature/forms/story-form/story-form.component';
import { BreadcrumbService } from 'xng-breadcrumb';
import { LIST_SERVICE_TOKEN } from 'src/app/modules/core/services/list/list.service';
import { StoryService } from 'src/app/modules/core/services/story/story.service';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
  providers: [
    {
      provide: LIST_SERVICE_TOKEN,
      useExisting: StoryService,
    },
  ],
})
export class EpicComponent implements OnInit {
  loading: boolean = true;
  epic!: Epic;
  stories: Story[] = [];
  formComponent: any;
  storySubject = new BehaviorSubject<Story[]>([]);
  stories$ = this.storySubject.asObservable();
  parentItemId: string | undefined;

  constructor(
    private epicService: EpicService,
    private storyService: StoryService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
    this.formComponent = StoryFormComponent;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('epic-id');

      if (id) {
        //sirve para el delete que despues de borrar actualice lista
        this.parentItemId = id;

        //traigo los datos del proyecto para mostrar la descripción
        this.epicService.getItemById(id).subscribe({
          next: (epic) => {
            this.epic = epic;
          },
          error: (error) => {
            this.loading = false;
            alert('Error fetching epic');
          },
          complete: () => {
            this.loading = false;
          },
        });

        //traigo las stories de la epica
        this.storyService.getItems(id).subscribe({
          next: (stories) => {
            this.stories = stories;
          },
          error: (error) => {
            this.loading = false;
            alert('Error fetching stories');
          },
          complete: () => {
            this.loading = false;
          },
        });

        //cambio el nombre del breadcrumb
        this.epicService.getItemName(id).subscribe((epicName) => {
            this.breadcrumbService.set('@Epic', `${epicName}`);
        });
      }
    });
  }

  getSpecificationsById(id: string) {
    return this.epicService.getItemById(id);
  }

  getStories(id: string) {
    return this.epicService.getStoriesByEpic(id);
  }
}
