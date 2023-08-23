import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { Story } from 'src/app/modules/models/story';
import { StoryFormComponent } from '../../feature/forms/story-form/story-form.component';
import { BreadcrumbService } from 'xng-breadcrumb';
import { LIST_SERVICE_TOKEN } from 'src/app/modules/core/services/list/list.service';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
  providers: [
    {
      provide: LIST_SERVICE_TOKEN,
      useExisting: EpicService,
    },
  ],
})
export class EpicComponent implements OnInit {
  id!: string;
  epic!: Epic;
  loading: boolean = true;
  stories: Story[] = [];

  formComponent: any;

  constructor(
    private epicService: EpicService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
    this.formComponent = StoryFormComponent;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('epic-id'); // Obtiene el id del parametro de la URL

      if (id) {
        this.breadcrumbService.set('@Epic', `Epic`);
        const info$ = this.getSpecificationsById(id);
        const stories$ = this.getStories(id);

        forkJoin([info$, stories$]).subscribe(([info, stories]) => {
          this.epic = info;
          this.stories = stories;
          this.loading = false;
        });
      }
    });
  }

  getSpecificationsById(id: string) {
    return this.epicService.getEpicById(id);
  }

  getStories(id: string) {
    return this.epicService.getStoriesByEpic(id);
  }
}
